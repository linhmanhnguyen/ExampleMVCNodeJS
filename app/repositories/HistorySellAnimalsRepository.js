const connection = require('../configs/MySQLConnect');

class HistorySellAnimalsRepository {
    /**
     * Function Repository: Thêm thông tin lịch sử bán động vật 
     */
    static async InsertHistory(user_id, farm_id, sellAnimals, totalWeightAnimals, unitPrice, dateAction, buyer_id, event_id) {
        const query = `
        INSERT INTO history_sell_animals (user_id, farm_id, sellAnimals, totalWeightAnimals, unitPrice, dateAction, buyer_id, event_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [user_id, farm_id, sellAnimals, totalWeightAnimals, unitPrice, dateAction, buyer_id, event_id];

        const result = await connection.query(query, params);
        return result;
    }
}

module.exports = HistorySellAnimalsRepository;