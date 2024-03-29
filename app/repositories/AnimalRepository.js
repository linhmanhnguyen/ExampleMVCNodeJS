const connection = require("../configs/MySQLConnect");

class AnimalRepository {
  /**
   * Function Model: Thêm thông tin một con vật vào trong chuồng
   */
  static async InsertAnimal(
    Cage_ID,
    Type,
    Gender_Animal,
    Weight,
    Entry_Date,
    Status
  ) {
    const query = `
      INSERT INTO animals (cage_id, type, genderAnimal, weight, entryDate, status)
      VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [Cage_ID, Type, Gender_Animal, Weight, Entry_Date, Status];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Lấy tất cả thông tin con vật trong một chuồng
   */
  static async GetAllAnimalsInCage(Cage_ID) {
    const query = `SELECT * FROM animals WHERE cage_id = ?`;
    const params = [Cage_ID];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Lấy thông tin chi tiết của một con vật trong một chuồng
   */
  static async GetAnimalByID(Animal_ID) {
    const query = `SELECT * FROM animals WHERE id = ?`;
    const params = [Animal_ID];
    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Cập nhật thông tin của một con vật
   */
  static async UpdateAnimalByID(
    Type,
    Gender_Animal,
    Weight,
    Entry_Date,
    Animal_ID
  ) {
    const query = `
                        UPDATE animals 
                        SET type = ?, genderAnimal = ?, weight = ?, entryDate = ?
                        WHERE id = ?`;

    const params = [Type, Gender_Animal, Weight, Entry_Date, Animal_ID];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Xóa thông tin của một con vật trong chuồng
   */
  static async DeleteAnimalByID(Animal_ID) {
    const query = `DELETE FROM animals WHERE id = ?`;
    const params = [Animal_ID];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Chuyển chuồng cho 1 động vật
   */
  static async TransferCageForAnimal(TransferCage_ID, Animal_ID) {
    const query = `
                        UPDATE animals 
                        SET cage_id = ?
                        WHERE id = ?`;

    const params = [TransferCage_ID, Animal_ID];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Cập nhật trạng thái của 1 động vật
   */
  static async UpdateStatusOfAnimal(Status, Animal_ID) {
    const query = `
                        UPDATE animals 
                        SET status = ?
                        WHERE id = ?`;

    const params = [Status, Animal_ID];

    const result = await connection.query(query, params);
    return result;
  }
}

module.exports = AnimalRepository;
