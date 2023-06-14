const mysql = require('mysql2/promise');

class HistoryCageEntryModel {
    /**
     * Function Model: Thêm lịch sử nhập chuồng
     */
    static async InsertHistory(userID, farmID, typeAnimalID, animalQuantity, weightOfAnimal, unitPrice, dateAction, supplierID) {
        const query = `
                        INSERT INTO History_Cage_Entry (User_ID, Farm_ID, TypeAnimal_ID, Animal_Quantity, WeightOfAnimal, Unit_Price, Date_Action, Supplier_ID)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    `;

        const params = [userID, farmID, typeAnimalID, animalQuantity, weightOfAnimal, unitPrice, dateAction, supplierID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy lịch sử nhập chuồng dựa theo ID của chuồng
     */
    static async GetHistoryByFarmID(Farm_ID) {
        const query = `SELECT * FROM History_Cage_Entry WHERE Farm_ID = ?`;
        const params = [Farm_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy thông tin chi tiết của 1 lịch sử nhập chuồng
     */
    static async GetHistoryByID(id) {
        const query = `SELECT * FROM History_Cage_Entry WHERE ID = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result[0];
    }

    /**
     * Function Model: Xóa 1 thông tin lịch sử nhập chuồng
     */
    static async DeleteHistory(id) {
        const query = `DELETE FROM History_Cage_Entry WHERE ID = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result.affectedRows > 0;
    }

}

module.exports = HistoryCageEntryModel;
