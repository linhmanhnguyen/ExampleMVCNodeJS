const connection = require('../configs/MySQLConnect');
const { connect } = require('../routes/FarmRouter');

class FarmModel {

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
        const query = `Select farms.* From user_farms 
                    join farms on user_farms.farm_id = farms.id 
                    where user_farms.userAccount_id = ?
                    `;
        const params = [UserAccount_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy 1 thông tin của trang trại bằng ID
     */
    static async GetFarmByID(id) {
        const query = `SELECT * FROM farms WHERE id = ?`;
        const params = [id];
        const result = await connection.query(query, params);
        return result;
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
     * Function Model: Lấy thông tin tổng quan về động vật trong trang trại (tổng số lượng con vật, tổng con vật đang khỏe, ốm và đã chết)
     */
    static async GetAnimalSummary(ID) {
        const query = `SELECT
        SUM(CASE WHEN animals.status = 'normal' THEN 1 ELSE 0 END) as healthy_animals,
        SUM(CASE WHEN animals.status = 'sick' THEN 1 ELSE 0 END) as sick_animals,
        SUM(CASE WHEN animals.status = 'dead' THEN 1 ELSE 0 END) as dead_animals,
        COUNT(*) as total_animals,
        animal_types.typeName as typeAnimal
        FROM animals
        JOIN cages ON animals.cage_id = cages.id
        JOIN farms ON farms.id = cages.farm_id
        JOIN animal_types ON animal_types.id = farms.animalType_id
        WHERE cages.farm_id = ?;
        `;
        const params = [ID];

        const result = await connection.query(query, params);
        return result;
    }

    static async ReportHealthStatusCount(farm_id) {
        const query = `
                        SELECT status, COUNT(*) AS count
                        FROM animals 
                        WHERE cage_id IN (
                            SELECT id FROM cages WHERE farm_id = ?
                        )
                        GROUP BY status;
                `;
        const params = [farm_id];
        const result = await connection.query(query, params);
        return result;
    }

    static async ReportDeathCountTime(startdate, enddate, farm_id) {
        const query = `
                    SELECT COUNT(*) AS death_count
                    FROM history_animal_death 
                    WHERE dateOccurrence BETWEEN ? AND ?
                    AND animal_id IN (
                        SELECT id FROM animals WHERE cage_id IN (
                            SELECT id FROM cages WHERE farm_id = ?
                        )
                    );
        `;
        const params = [startdate, enddate, farm_id];
        const result = await connection.query(query, params);
        return result;
    }

    static async RerportAverageWeightGain(farm_id) {
        const query = `
        SELECT 
            a.id AS animal_id, 
            ((MAX(haw.weight) - MIN(haw.weight)) / DATEDIFF(MAX(haw.dateAction), MIN(haw.dateAction))) AS average_weight_gain
            FROM history_animal_weight AS haw
            JOIN animals AS a ON a.id = haw.animal_id
            JOIN cages AS c ON c.id = a.cage_id
            JOIN farms AS f ON f.id = c.farm_id
            WHERE haw.dateAction BETWEEN ? AND ? AND f.id = ?
            GROUP BY a.id;
        `;
        const params = [farm_id];
        const result = await connection.query(query, params);
        return result;
    }

}

module.exports = FarmModel;