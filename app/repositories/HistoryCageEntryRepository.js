const connection = require('../configs/MySQLConnect');

class HistoryCageEntryRepository {
    /**
     * Function Model: Thêm lịch sử nhập chuồng
     */
    static async InsertHistory(userID, farmID, typeAnimalID, animalQuantity, weightOfAnimal, unitPrice, dateAction, supplierID) {
        const query = `
                        INSERT INTO history_cage_entry (user_id, farm_id, typeAnimal_id, animalQuantity, weightOfAnimal, unitPrice, dateAction, supplier_id)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    `;

        const params = [userID, farmID, typeAnimalID, animalQuantity, weightOfAnimal, unitPrice, dateAction, supplierID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy lịch sử nhập chuồng dựa theo ID của trang trại
     */
    static async GetHistoryByFarmID(Farm_ID) {
        const query = `SELECT * FROM history_cage_entry WHERE farm_id = ?`;
        const params = [Farm_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy thông tin chi tiết của 1 lịch sử nhập chuồng
     */
    static async GetHistoryByID(id) {
        const query = `SELECT * FROM history_cage_entry WHERE id = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result[0];
    }

    /**
     * Function Model: Xóa 1 thông tin lịch sử nhập chuồng
     */
    static async DeleteHistory(id) {
        const query = `DELETE FROM history_cage_entry WHERE id = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result.affectedRows > 0;
    }

}

module.exports = HistoryCageEntryRepository;
