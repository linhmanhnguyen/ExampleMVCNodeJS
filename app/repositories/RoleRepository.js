const connection = require("../configs/MySQLConnect");
const RoleModel = require("../models/RoleModel");

class RoleRepository {
  /**
   * Function Repository: Lấy tất cả roles đang có trong db
   */
  static async GetAllRoles() {
    const query = `SELECT * FROM roles`;
    const params = [];
    const result = await connection.query(query, params);

    if (result.length === 0) {
      return null;
    }

    const roles = [];

    for (const row of result) {
      const role = new RoleModel(row.id, row.roleName);
      roles.push(role);
    }

    return roles;
  }

  /**
   * Function Repository: Lấy role bằng id của role
   */
  static async GetRoleByID(id) {
    const query = `SELECT * FROM roles WHERE id = ?`;
    const params = [id];
    const result = await connection.query(query, params);

    if (result.length === 0) {
      return null;
    }

    const role = new RoleModel(result[0].id, result[0].roleName);
    return role;
  }
}

module.exports = RoleRepository;
