const connection = require('../configs/MySQLConnect');

class AddressRepository {
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

    static async GetAddressByWardID(wards_id) {
        const query = `Select wards.wards_id, wards.name as ward_name, 
                        province.province_id, province.name as province_name, 
                        district.district_id, district.name as district_name 
                        from wards  join district on wards.district_id = district.district_id
                                    join province on district.province_id = province.province_id
                                    where wards.wards_id = ?`;
        const params = [wards_id];
        const result = await connection.query(query, params);
        return result;
    }
}

module.exports = AddressRepository;