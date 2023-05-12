const connection = require('../configs/MySQLConnect');

class FarmModel {

    /**
     * Function Model: Lấy danh sách tất cả các trang trại trong hệ thống
     */
    static async GetAllFarms() {
        const query = `
                        SELECT  farms.*,
                                users.fullname
                        FROM farms 
                        JOIN users ON farms.owner_ID = users.ID`;

        const params = [];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy danh sách tất cả các trang trại của 1 chủ sở hữu
     */
    static async GetFarmsByOwnerID(owner_ID) {
        const query = `
                        SELECT  farms.*,
                                users.fullname
                        FROM farms 
                        JOIN users ON farms.owner_ID = users.ID
                        WHERE farms.owner_ID = ?`;

        const params = [owner_ID];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Thêm 1 trang trại vào hệ thống
     */
    static async InsertFarm(farm_name, address, date_created, owner_ID) {
        const query = `
        INSERT INTO farms (farm_name, address, date_created, owner_ID) 
        VALUES (?, ?, ?, ?)`;
        const params = [farm_name, address, date_created, owner_ID];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy thông tin trang trại bằng ID
     */
    static async GetFarmByID(ID) {
        const query = `
                        SELECT  farms.*,
                                users.fullname
                        FROM farms 
                        JOIN users ON farms.owner_ID = users.ID
                        WHERE farms.ID =?`;
        const params = [ID];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Cập nhật thông tin trang trại
     */
    static async UpdateFarm(farm_name, address, date_created, ID) {
        const query = `
                        UPDATE farms 
                        SET farm_name = ?, address = ?, date_created = ?
                        WHERE ID = ?`;
        const params = [farm_name, address, date_created, ID];

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