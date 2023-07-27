const connection = require('../configs/MySQLConnect');

class HistoryAnimalWeightRepository {
    /**
     * Function Model: Thêm lịch sử cân cho 1 động vật
     */
    static async InsertHistory(Type_Action, Animal_ID, Employee_ID, Weight, Content, Date_Action) {

        const query = `
                        INSERT INTO history_animal_weight (typeAction, animal_id, employee_id, weight, content, dateAction)
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
        const query = 'SELECT * FROM history_animal_weight WHERE animal_id = ?';
        const params = [Animal_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy 1 lịch sử cân của 1 động vật
     */
    static async GetHistoryOfAnimal(History_ID, Animal_ID) {
        const query = 'SELECT * FROM history_animal_weight WHERE id = ? AND animal_id = ?';
        const params = [History_ID, Animal_ID];
        const result = await connection.query(query, params);
        return result;

    }

    /**
     * Function Model: Xóa 1 lịch sử cân của 1 động vật
     */
    static async DeleteHistoryOfAnimal(History_ID, Animal_ID) {
        const query = 'DELETE FROM history_animal_weight WHERE id = ? AND animal_id = ?';
        const params = [History_ID, Animal_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Xóa toàn bộ lịch sử cân của 1 động vật
     */
    static async DeleteHistoriesOfAnimal(Animal_ID) {
        const query = 'DELETE FROM history_animal_weight WHERE animal_id =?';
        const params = [Animal_ID];
        const result = await connection.query(query, params);
        return result;
    }

}

module.exports = HistoryAnimalWeightRepository;
