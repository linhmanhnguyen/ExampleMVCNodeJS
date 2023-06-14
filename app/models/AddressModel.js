const connection = require('../configs/MySQLConnect');

class AddressModel {
    /**
     * Function Model: Lấy tất cả tỉnh thành trong database
     */
    static async GetAllProvinces() {
        const query = `SELECT * FROM province`;
        const params = [];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy tất cả quận huyện trong 1 tỉnh thành
     */
    static async GetAllDistrictsByProvince(province_id) {
        const query = `SELECT * FROM district WHERE province_id = ?`;
        const params = [province_id];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy tất cả phường xã trong 1 quận huyện
     */
    static async GetAllWardsByDistrict(district_id) {
        const query = `SELECT * FROM wards WHERE district_id =?`;
        const params = [district_id];
        const result = await connection.query(query, params);
        return result;
    }
}

module.exports = AddressModel;