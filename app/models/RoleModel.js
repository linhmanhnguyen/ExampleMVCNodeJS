const connection = require('../configs/MySQLConnect');

class RoleModel {
    /**
     * Function Model: Lấy tất cả roles đang có trong db
     */
    static async GetAllRoles() {
        const query = `SELECT * FROM Roles`;
        const params = [];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy role bằng id của role
     */
    static async GetRoleByID(id) {
        const query = `SELECT * FROM Roles WHERE id =?`;
        const params = [id];
        const result = await connection.query(query, params);
        return result;
    }


}

module.exports = RoleModel;