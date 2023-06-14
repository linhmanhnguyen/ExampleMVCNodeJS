const connection = require('../configs/MySQLConnect');

class RoleModel {
    /**
     * Function Model: 
     */
    static async GetAllRoles() {
        const query = `SELECT * FROM Roles`;
        const params = [];
        const result = await connection.query(query, params);
        return result;
    }
}

module.exports = RoleModel;