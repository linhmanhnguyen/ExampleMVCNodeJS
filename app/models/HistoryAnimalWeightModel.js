const connection = require('../configs/MySQLConnect');

class HistoryAnimalWeightModel {
    /**
     * Function Model: Thêm lịch sử cân cho 1 động vật
     */
    static async InsertHistory(Type_Action, Animal_ID, Employee_ID, Weight, Content, Date_Action) {

        const query = `
                        INSERT INTO History_Animal_Weight (Type_Action, Animal_ID, Employee_ID, Weight, Content, Date_Action)
                        VALUES (?, ?, ?, ?, ?, ?)
                    `;

        const params = [Type_Action, Animal_ID, Employee_ID, Weight, Content, Date_Action];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy tất cả lịch sử cân của 1 động vật
     */
    static async GetHistoriesOfAnimal(Animal_ID) {
        const query = 'SELECT * FROM History_Animal_Weight WHERE Animal_ID = ?';
        const params = [Animal_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy 1 lịch sử cân của 1 động vật
     */
    static async GetHistoryOfAnimal(History_ID, Animal_ID) {
        const query = 'SELECT * FROM History_Animal_Weight WHERE ID = ? AND Animal_ID = ?';
        const params = [History_ID, Animal_ID];
        const result = await connection.query(query, params);
        return result;

    }

    /**
     * Function Model: Xóa 1 lịch sử cân của 1 động vật
     */
    static async DeleteHistoryOfAnimal(History_ID, Animal_ID) {
        const query = 'DELETE FROM History_Animal_Weight WHERE ID = ? AND Animal_ID = ?';
        const params = [History_ID, Animal_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Xóa toàn bộ lịch sử cân của 1 động vật
     */
    static async DeleteHistoriesOfAnimal(Animal_ID) {
        const query = 'DELETE FROM History_Animal_Weight WHERE Animal_ID =?';
        const params = [Animal_ID];
        const result = await connection.query(query, params);
        return result;
    }

}

module.exports = HistoryAnimalWeightModel;
