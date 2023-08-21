const connection = require('../configs/MySQLConnect');

class BuyerRepository {
    /**
     * Function Repository: Thêm thông tin bên người mua
     */
    static async InsertBuyer(name, phone, ward_ID, farm_ID, addressDetail) {
        const query = `
        INSERT INTO buyers (name, phone, ward_id, farm_id, addressDetail) 
        VALUES (?, ?, ?, ?, ?)`;
        const params = [name, phone, ward_ID, farm_ID, addressDetail];

        const result = await connection.query(query, params);
        return result;
    }
}

module.exports = BuyerRepository;