const connection = require('../configs/MySQLConnect');

class PenModel {
    /**
     * Function Model: Thêm 1 chuồng nuôi vào trại
     */
    static async InsertPen(pen_name, address, animal_type_ID, farm_ID) {
        const query = `
        INSERT INTO farms (farm_name, address, date_created, owner_ID) 
        VALUES (?, ?, ?, ?)`;
        const params = [farm_name, address, date_created, owner_ID];

        const result = await connection.query(query, params);
        return result;
    }
}

module.exports = PenModel;