const connection = require("../configs/MySQLConnect");
const AnimalTypeModel = require("../models/AnimalTypeModel");

class AnimalTypeRepository {
  /**
   * Function Model: Thêm 1 loại động vật
   */
  static async InsertAnimalType(TypeName) {
    const query = `
        INSERT INTO animal_types (typeName) 
        VALUES (?)`;
    const params = [TypeName];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Lấy toàn bộ danh sách của loại động vật
   */
  static async GetAnimalTypes() {
    const query = `SELECT * FROM animal_types`;
    const params = [];

    const result = await connection.query(query, params);

    if (result.length === 0) {
      return null;
    }

    const animalTypes = [];

    for (const row of result) {
      const animalType = new AnimalTypeModel(row.id, row.typeName, row.imgPath);
      animalTypes.push(animalType);
    }

    return animalTypes;
  }

  /**
   * Function Model: Lấy 1 loại động vật bằng ID
   */
  static async GetAnimalTypesById(id) {
    const query = `SELECT * FROM animal_types WHERE id = ?`;
    const params = [id];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Cập nhật thông tin 1 loại động vật
   */
  static async UpdateAnimalTypeById(TypeName, id) {
    const query = `
                        UPDATE animal_types 
                        SET typeName = ?
                        WHERE id = ?`;
    const params = [TypeName, id];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Xóa 1 loại động vật
   */
  static async DeleteAnimalTypeByID(id) {
    const query = `DELETE FROM animal_types WHERE id = ?`;
    const params = [id];

    const result = await connection.query(query, params);
    return result;
  }
}

module.exports = AnimalTypeRepository;
