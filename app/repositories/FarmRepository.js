const connection = require('../configs/MySQLConnect');
const AnimalSummaryModel = require('../models/AnimalSummaryModel');
const AnimalSummaryOfEachCageModel = require('../models/AnimalSummaryOfEachCageModel');
const CageSummaryModel = require('../models/CageSummaryModel');
const FarmModel = require('../models/FarmModel');
const GetSubStandardAnimalsModel = require('../models/GetSubStandardAnimalsModel');
const ReportEntryCageModel = require('../models/ReportEntryCageModel');

class FarmRepository {
    /**
     * Function Model: Thêm 1 trang trại vào hệ thống
     */
    static async InsertFarm(FarmName, CreationDate, Status, AnimalType_ID, AnimalDensity, Ward_ID, AddressDetail, LastModified) {
        const query = `
        INSERT INTO farms (farmName, creationDate, status, animalType_id, animalDensity, ward_id, addressDetail, lastModified) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [FarmName, CreationDate, Status, AnimalType_ID, AnimalDensity, Ward_ID, AddressDetail, LastModified];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy toàn bộ danh sách trang trại trong hệ thống
     */
    static async GetAllFarms(UserAccount_ID) {
        const query = `
                    Select farms.* 
                    From user_farms 
                    join farms on user_farms.farm_id = farms.id 
                    where user_farms.userAccount_id = ?
                    `;
        const params = [UserAccount_ID];
        const result = await connection.query(query, params);

        if (result.length === 0) {
            return null;
        }

        const farms = [];

        for (const row of result) {
            const farm = new FarmModel(row.id, row.farmName, row.creationDate, row.status, row.animalType_id, row.animalDensity, row.ward_id, row.addressDetail, row.lastModified);
            farms.push(farm);
        }
        return farms;
    }

    /**
     * Function Model: Lấy 1 thông tin của trang trại bằng ID
     */
    static async GetFarmByID(id) {
        const query = `SELECT * FROM farms WHERE id = ?`;
        const params = [id];
        const result = await connection.query(query, params);

        if (result.length === 0) {
            return null;
        }

        const farm = new FarmModel(result[0].id, result[0].farmName, result[0].creationDate, result[0].status, result[0].animalType_id, result[0].animalDensity, result[0].ward_id, result[0].addressDetail, result[0].lastModified);
        return farm;

    }

    /**
     * Function Model: Cập nhật thông tin của trang trại
     */
    static async UpdateFarmByID(FarmName, Status, AnimalType_ID, AnimalDensity, Ward_ID, AddressDetail, LastModified, id) {
        const query = `
                        UPDATE farms 
                        SET farmName = ?, status = ?, animalType_id = ?, animalDensity = ?, ward_id = ?, addressDetail = ?, lastModified = ?
                        WHERE id = ?`;

        const params = [FarmName, Status, AnimalType_ID, AnimalDensity, Ward_ID, AddressDetail, LastModified, id];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Xóa trang trại 
     */
    static async DeleteFarm(ID) {
        const query = `
                        DELETE FROM farms 
                        WHERE id = ?`;
        const params = [ID];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Repository: Lấy thông tin tổng quan về động vật trong trang trại (tổng số lượng con vật, tổng con vật đang khỏe, ốm và đã chết)
     */
    static async ReportAnimalSummary(farm_id) {
        const query = `SELECT
        COALESCE(SUM(CASE WHEN animals.status = 'normal' THEN 1 ELSE 0 END), 0) as healthy_animals,
        COALESCE(SUM(CASE WHEN animals.status = 'sick' THEN 1 ELSE 0 END), 0) as sick_animals,
        COALESCE(SUM(CASE WHEN animals.status = 'dead' THEN 1 ELSE 0 END), 0) as dead_animals,
        COALESCE(COUNT(animals.id), 0) as total_animals
        FROM
            animals
        JOIN
            cages ON animals.cage_id = cages.id
        JOIN
            farms ON farms.id = cages.farm_id
        WHERE
            farms.id = ?;
        `;
        const params = [farm_id];
        const result = await connection.query(query, params);

        if (result.length === 0) {
            return null;
        }

        const summary = new AnimalSummaryModel(result[0].healthy_animals, result[0].sick_animals, result[0].dead_animals, result[0].total_animals, result[0].typeAnimal);
        return summary;
    }

    /**
     * Function Repository: Lấy thông tin tổng quan về động vật của từng chuồng như tổng động vật trong từng chuồng, số lượng động vật đang ốm, bình thường và đã chết
     */
    static async ReportAnimalSummaryOfEachCage(farm_id) {
        const query = `
        SELECT
            c.id AS cage_id,
            ud.fullName AS manager_fullname,
            COUNT(a.id) AS total_animals,
            COUNT(CASE WHEN a.status = 'normal' THEN 1 ELSE NULL END) AS healthy_count,
            COUNT(CASE WHEN a.status = 'sick' THEN 1 ELSE NULL END) AS sick_count,
            COUNT(CASE WHEN a.status = 'dead' THEN 1 ELSE NULL END) AS dead_count
        FROM
            cages c
        LEFT JOIN
            animals a ON c.id = a.cage_id
        LEFT JOIN
            user_accounts uc ON c.manager_id = uc.id
        LEFT JOIN
            user_details ud ON uc.userDetail_id = ud.id
        WHERE
            c.farm_id = ?
        GROUP BY
            c.id, c.cageName, ud.fullName
        ORDER BY
            c.id;
        `;
        const params = [farm_id];
        const result = await connection.query(query, params);

        if (result.length === 0) {
            return null;
        }

        const cages = [];

        for (const row of result) {
            const cage = new AnimalSummaryOfEachCageModel(row.cage_id, row.manager_fullname, row.total_animals, row.healthy_count, row.sick_count, row.dead_count);
            cages.push(cage);
        }
        return cages;


    }

    /**
     * Function Repository: Lấy thông tin báo cáo nhập chuồng dựa trên 1 event
     */
    static async ReportEntryCage(farm_id, event_id) {
        const query = `
        SELECT 
        SUM(hce.animalQuantity) AS totalAnimals,
        ROUND(AVG(hce.weightOfAnimal), 2) AS averageWeightOfAnimal,
        ROUND(SUM(hce.weightOfAnimal), 2) AS totalWeightOfAnimals,
        ROUND(AVG(hce.unitPrice), 2) AS averageUnitPrice,
        ROUND(SUM(hce.animalQuantity * hce.unitPrice), 2) AS totalPrice
        FROM 
            history_cage_entry AS hce
        WHERE 
            hce.farm_id = ? AND hce.event_id = ?;
        `;
        const params = [farm_id, event_id];
        const result = await connection.query(query, params);

        if (result.length === 0) {
            return null;
        }

        const report = new ReportEntryCageModel(
            result[0].totalAnimals,
            result[0].averageWeightOfAnimal,
            result[0].totalWeightOfAnimals,
            result[0].averageUnitPrice,
            result[0].totalPrice
        );

        return report;
    }

    /**
     * Function Repository: Lấy thông tin số lượng động vật không đạt tiêu chuẩn trong 1 trang trại
     */
    static async GetSubStandardAnimals(weight, farm_id) {
        const query = `
            SELECT
            COUNT(a.id) AS totalAnimals,
            ROUND(SUM(a.weight), 2) AS totalWeightAnimals,
            ROUND(AVG(a.weight), 2) AS averageWeightAnimals
        FROM
            animals a
        JOIN
            cages c ON a.cage_id = c.id
        JOIN
            farms f ON c.farm_id = f.id
        WHERE
            a.weight < ?
            AND a.status = 'normal'
            AND f.id = ?;
        `;

        const params = [weight, farm_id];
        const result = await connection.query(query, params);

        const info = new GetSubStandardAnimalsModel(
            result[0].totalAnimals,
            result[0].totalWeightAnimals,
            result[0].averageWeightAnimals
        );

        return info;
    }

    /**
     * Function Repository: Lấy thông tin số lượng động vật đạt tiêu chuẩn trong 1 trang trại
     */
    static async GetStandardAnimals(weight, farm_id) {
        const query = `
                SELECT
                COUNT(a.id) AS totalAnimals,
                ROUND(SUM(a.weight), 2) AS totalWeightAnimals,
                ROUND(AVG(a.weight), 2) AS averageWeightAnimals
            FROM
                animals a
            JOIN
                cages c ON a.cage_id = c.id
            JOIN
                farms f ON c.farm_id = f.id
            WHERE
                a.weight >= ?
                AND a.status = 'normal'
                AND f.id = ?;
            `;

        const params = [weight, farm_id];
        const result = await connection.query(query, params);

        if (result.length === 0) {
            return null;
        }

        const info = new GetSubStandardAnimalsModel(
            result[0].totalAnimals,
            result[0].totalWeightAnimals,
            result[0].averageWeightAnimals
        );

        return info;
    }

    /**
     * Function Repository: Lấy thông tin tổng quan về chuồng như có bao nhiêu chuồng đang trống và có bao nhiêu chuồng đang được sử dụng
     */
    static async GetCageSummary(farm_id) {
        const query = `
        SELECT
            SUM(CASE WHEN animal_count > 0 THEN 1 ELSE 0 END) AS cagesWithAnimals,
            SUM(CASE WHEN animal_count = 0 THEN 1 ELSE 0 END) AS emptyCages
        FROM (
            SELECT
                c.id AS cage_id,
                COUNT(a.id) AS animal_count
            FROM
                cages c
            LEFT JOIN
                animals a ON c.id = a.cage_id
            WHERE
                c.farm_id = ?
            GROUP BY
                c.id
        ) AS cage_animal_counts;
        `;
        const params = [farm_id];
        const result = await connection.query(query, params);

        if (result.length === 0) {
            return null;
        }

        const summray = new CageSummaryModel(result[0].cagesWithAnimals, result[0].emptyCages);
        return summray;
    }

}

module.exports = FarmRepository;