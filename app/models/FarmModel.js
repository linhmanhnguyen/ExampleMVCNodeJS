const connection = require('../configs/MySQLConnect');

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

}

module.exports = FarmModel;