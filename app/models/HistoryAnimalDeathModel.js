const connection = require('../configs/MySQLConnect');

class HistoryAnimalDeathModel {
    /**
     * Function Model: Thêm lịch sử tử hẹo cho 1 động vật
     */
    static async InsertHistory(Animal_ID, Employee_ID, Type_Cause, Reason, Date_Occurrence) {
        const query = `
                        INSERT INTO History_Animal_Death (Animal_ID, Employee_ID, Type_Cause, Reason, Date_Occurrence)
                        VALUES (?, ?, ?, ?, ?)
                    `;
        const params = [Animal_ID, Employee_ID, Type_Cause, Reason, Date_Occurrence];
        const result = await connection.query(query, params);
        return result.insertId;
    }


    /**
     * Function Model: Lấy lịch sử tử hẹo của 1 động vật
     */
    static async GetHistoryOfAnimal(Animal_ID) {
        const query = 'SELECT * FROM History_Animal_Death WHERE Animal_ID = ?';
        const params = [Animal_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Xóa lịch sử tử hẹo của 1 động vật
     */
    static async DeleteHistory(Animal_ID) {
        const query = 'DELETE FROM History_Animal_Death WHERE Animal_ID = ?';
        const params = [Animal_ID]
        const result = await connection.query(query, params);
        return result;
    }
}

module.exports = HistoryAnimalDeathModel;