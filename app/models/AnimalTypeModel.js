const connection = require('../configs/MySQLConnect');

class AnimalTypeModel {

    /**
     * Function Model: Thêm 1 loại động vật
     */
    static async InsertAnimalType(TypeName) {
        const query = `
        INSERT INTO AnimalTypes (TypeName) 
        VALUES (?)`;
        const params = [TypeName];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy toàn bộ danh sách của loại động vật
     */
    static async GetAnimalTypes() {
        const query = `SELECT * FROM AnimalTypes`;
        const params = [];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy 1 loại động vật bằng ID
     */
    static async GetAnimalTypesById(id) {
        const query = `SELECT * FROM AnimalTypes WHERE ID = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Cập nhật thông tin 1 loại động vật
     */
    static async UpdateAnimalTypeById(TypeName, id) {
        const query = `
                        UPDATE AnimalTypes 
                        SET TypeName = ?
                        WHERE ID = ?`;
        const params = [TypeName, id];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Xóa 1 loại động vật
     */
    static async DeleteAnimalTypeByID(id) {
        const query = `DELETE FROM AnimalTypes WHERE ID = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result;
    }

}

module.exports = AnimalTypeModel;