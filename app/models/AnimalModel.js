const connection = require('../configs/MySQLConnect');

class AnimalModel {
    /**
     * Function Model: Thêm thông tin một con vật vào trong chuồng
     */
    static async InsertAnimal(Cage_ID, Gender_Animal, Weight, Entry_Date, Status) {
        const query = `
      INSERT INTO animals (Cage_ID, Gender_Animal, Weight, Entry_Date, Status)
      VALUES (?, ?, ?, ?, ?)`;
        const params = [Cage_ID, Gender_Animal, Weight, Entry_Date, Status];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy tất cả thông tin con vật trong một chuồng
     */
    static async GetAllAnimalsInCage(Cage_ID) {
        const query = `SELECT * FROM animals WHERE Cage_ID = ?`;
        const params = [Cage_ID];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy thông tin chi tiết của một con vật trong một chuồng
     */
    static async GetAnimalByID(Animal_ID, Cage_ID) {
        const query = `SELECT * FROM animals WHERE ID = ? AND Cage_ID = ?`;
        const params = [Animal_ID, Cage_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Cập nhật thông tin của một con vật
     */
    static async UpdateAnimalByID(Gender_Animal, Weight, Entry_Date, Status, Animal_ID, Cage_ID) {
        const query = `
                        UPDATE animals 
                        SET Gender_Animal = ?, Weight = ?, Entry_Date = ?, Status = ?
                        WHERE ID = ? AND Cage_ID = ?`;

        const params = [Gender_Animal, Weight, Entry_Date, Status, Animal_ID, Cage_ID];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Xóa thông tin của một con vật trong chuồng
     */
    static async DeleteAnimalByID(Animal_ID, Cage_ID) {
        const query = `DELETE FROM animals WHERE ID = ? AND Cage_ID = ?`;
        const params = [Animal_ID, Cage_ID];

        const result = await connection.query(query, params);
        return result;
    }
}

module.exports = AnimalModel;