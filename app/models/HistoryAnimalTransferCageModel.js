const connection = require('../configs/MySQLConnect');

class HistoryAnimalTransferCageModel {
    /**
     * Function Model: Tạo ra 1 lịch sử chuyển trại của heo
     */
    static async CreateHistory(Animal_ID, OriginalCage_ID, TransferCage_ID, Employee_ID, Content, Date_Action) {

        const query = `
                            INSERT INTO History_Animal_Transfer_Cage (Animal_ID, OriginalCage_ID, TransferCage_ID, Employee_ID, Content, Date_Action)
                            VALUES (?, ?, ?, ?, ?, ?)
                        `;

        const params = [Animal_ID, OriginalCage_ID, TransferCage_ID, Employee_ID, Content, Date_Action];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy các lịch sử bằng ID của động vật 
     */
    static async GetHistoryByAnimalID(Animal_ID) {
        const query = 'SELECT * FROM History_Animal_Transfer_Cage WHERE Animal_ID = ?';
        const params = [Animal_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy 1 lịch sử chuyển chuồng bằng ID của lịch sử 
     */
    static async GetHistoryByID(History_ID, Animal_ID) {
        const query = 'SELECT * FROM History_Animal_Transfer_Cage WHERE ID = ? AND Animal_ID = ?';
        const params = [History_ID, Animal_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     *Function Model: Xóa 1 lịch sử chuyển chuồng
     */
    static async DeleteHistoryByID(History_ID, Animal_ID) {
        const query = 'DELETE FROM History_Animal_Transfer_Cage WHERE ID = ? AND Animal_ID = ?';
        const params = [History_ID, Animal_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     *Function Model: Xóa tất cả lịch sử chuyển chuồng của 1 động vật
     */
    static async DeleteHistoriesOfAnimal(Animal_ID) {
        const query = 'DELETE FROM History_Animal_Transfer_Cage WHERE Animal_ID = ?';
        const params = [Animal_ID];
        const result = await connection.query(query, params);
        return result;
    }

}

module.exports = HistoryAnimalTransferCageModel;