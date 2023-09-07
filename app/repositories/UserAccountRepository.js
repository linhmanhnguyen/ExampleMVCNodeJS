const connection = require("../configs/MySQLConnect");
const bcrypt = require("bcrypt");

class UserAccountRepository {
  /**
   * Function Repository: Thêm thông tin tài khoản cho 1 người dùng
   */
  static async InsertUserAccount(
    Username,
    Password,
    CreateDate,
    UserDetail_ID,
    RefreshToken,
    Farm_ID
  ) {
    const query = `
                        INSERT INTO user_accounts (username, password, createDate, userDetail_id, refreshToken) 
                        VALUES (?, ?, ?, ?, ?)`;

    const hashedPassword = await bcrypt.hash(Password, 10);

    const params = [
      Username,
      hashedPassword,
      CreateDate,
      UserDetail_ID,
      RefreshToken,
      Farm_ID,
    ];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Lấy toàn bộ danh sách tài khoản
   */
  static async GetAllUserAccounts() {
    const query = `SELECT id, username, createDate FROM user_accounts`;
    const params = [];
    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Lấy thông tin chi tiết của 1 tài khoản bằng ID
   */
  static async GetUserAccountByID(id) {
    const query = `SELECT id, username, createDate FROM user_accounts WHERE id = ?`;
    const params = [id];
    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Cập nhập thông tin chi tiết của 1 tài khoản bằng ID
   */
  static async UpdateUserAccountById(password, id) {
    const query = `
                        UPDATE user_accounts 
                        SET password = ?
                        WHERE id = ?`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const params = [hashedPassword, id];
    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Xóa thông tin tài khoản trong 1 thông tin người dùng
   */
  static async DeleteUserAccountByID(id) {
    const query = `DELETE FROM user_accounts WHERE id = ?`;
    const params = [id];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Gán tài khoản vừa được tạo với role ID
   */
  static async InsertRoleForUserAccount(
    UserAccount_ID,
    Role_ID,
    CreateDate,
    Status
  ) {
    const query = `
                        INSERT INTO user_roles (userAccount_id, role_id, createDate, status) 
                        VALUES (?, ?, ?, ?)`;
    const params = [UserAccount_ID, Role_ID, CreateDate, Status];
    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Gán tài khoản vào trang trại
   */
  static async InsertUserAccountToFarm(
    UserAccount_ID,
    Farm_ID,
    CreateDate,
    Status
  ) {
    const query = `
                        INSERT INTO user_farms (userAccount_id, farm_id, createDate, status) 
                        VALUES (?, ?, ?, ?)`;
    const params = [UserAccount_ID, Farm_ID, CreateDate, Status];
    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Tìm tài khoản bằng username ()
   */
  static async SearchUserAccountByUsername(username) {
    const query = ` SELECT user_accounts.id, user_accounts.username, user_accounts.password, user_accounts.userDetail_id,
                        user_roles.role_id, 
                        roles.roleName, user_roles.status,
                        user_farms.farm_id
                        FROM user_accounts 
                        JOIN user_roles ON user_accounts.id = user_roles.userAccount_id 
                        JOIN roles ON roles.id = user_roles.role_id 
                        JOIN user_farms ON user_farms.userAccount_id = user_accounts.id
                        WHERE user_accounts.username = ?;
                        `;

    const params = [username];
    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Tìm tài khoản bằng username
   */
  static async CheckExistUsername(username) {
    const query = `SELECT username FROM user_accounts WHERE username = ?`;
    const params = [username];
    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Thêm tài khoản vào trong 1 chuồng
   */
  static async InsertUserAccountToCage(
    employee_id,
    cage_id,
    dateStart,
    isLivestockStaff,
    isVeterinaryStaff,
    status,
    lastModified
  ) {
    const query = `
                        INSERT INTO cage_employees (employee_id, cage_id, dateStart, isLivestockStaff, isVeterinaryStaff, status, lastModified)
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      employee_id,
      cage_id,
      dateStart,
      isLivestockStaff,
      isVeterinaryStaff,
      status,
      lastModified,
    ];
    const result = await connection.query(query, params);
    return result;
  }
}

module.exports = UserAccountRepository;
