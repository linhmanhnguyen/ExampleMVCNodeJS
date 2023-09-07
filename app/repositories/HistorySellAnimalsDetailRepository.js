const connection = require("../configs/MySQLConnect");

class HistorySellAnimalsDetailRepository {
  /**
   * Function Repository: Thêm thông tin lịch sử bán động vật
   */
  static async InsertHistory(
    cage_id,
    sellAnimals,
    totalWeightAnimals,
    historySellAnimals_id
  ) {
    const query = `
        INSERT INTO history_sell_animals_detail (cage_id, sellAnimals, totalWeightAnimals, historySellAnimals_id) 
        VALUES (?, ?, ?, ?)`;
    const params = [
      cage_id,
      sellAnimals,
      totalWeightAnimals,
      historySellAnimals_id,
    ];

    const result = await connection.query(query, params);
    return result;
  }
}

module.exports = HistorySellAnimalsDetailRepository;
