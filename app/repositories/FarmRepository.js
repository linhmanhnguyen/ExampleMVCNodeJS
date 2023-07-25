const connection = require('../configs/MySQLConnect');
const AnimalSummaryModel = require('../models/AnimalSummaryModel');
const FarmModel = require('../models/FarmModel');

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
        return result.insertId;
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
     * Function Repository: Lấy thông tin báo cáo nhập chuồng dựa trên 1 khoảng thời gian
     */
    static async ReportEntryCage(farm_id, startDate, endDate) {
        const query = `
        SELECT
        f.farmName AS farm_name,
        hce.dateAction AS entry_date,
        SUM(hce.animalQuantity) AS total_quantity,
        SUM(hce.unitPrice * hce.animalQuantity) AS total_amount,
        SUM(hce.weightOfAnimal * hce.animalQuantity) AS total_weight
        FROM
        history_cage_entry hce
        INNER JOIN
        farms f ON hce.farm_id = f.id
        WHERE
        hce.farm_id = ?
        AND hce.dateAction BETWEEN ? AND ?
        GROUP BY
        f.farmName,
        hce.dateAction;
        `;
        const params = [farm_id, startDate, endDate];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Repository: 
     */



}

module.exports = FarmRepository;