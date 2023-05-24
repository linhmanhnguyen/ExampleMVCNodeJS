const connection = require('../configs/MySQLConnect');

class FarmModel {

    /**
     * Function Model: Thêm 1 trang trại vào hệ thống
     */
    static async InsertFarm(FarmName, CreationDate, Status, AnimalType_ID, AnimalDensity, Ward_ID, AddressDetail, LastModified) {
        const query = `
        INSERT INTO farms (FarmName, CreationDate, Status, AnimalType_ID, AnimalDensity, Ward_ID, AddressDetail, LastModified) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [FarmName, CreationDate, Status, AnimalType_ID, AnimalDensity, Ward_ID, AddressDetail, LastModified];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy toàn bộ danh sách trang trại trong hệ thống
     */
    static async GetAllFarms() {
        const query = `SELECT * FROM farms`;
        const params = [];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy 1 thông tin của trang trại bằng ID
     */
    static async GetFarmByID(id) {
        const query = `SELECT * FROM farms WHERE ID = ?`;
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
                        SET FarmName = ?, Status = ?, AnimalType_ID = ?, AnimalDensity = ?, Ward_ID = ?, AddressDetail = ?, LastModified = ?
                        WHERE ID = ?`;

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
                        WHERE ID = ?`;
        const params = [ID];

        const result = await connection.query(query, params);
        return result;
    }

}

module.exports = FarmModel;