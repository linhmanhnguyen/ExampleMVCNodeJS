const connection = require("../configs/MySQLConnect");
const UserInfoModel = require("../models/UserInfoModel");

class UserDetailRepository {
  /**
   * Function Model: Thêm 1 thông tin chi tiết người dùng khi đăng ký
   */
  static async InsertUserDetailWhenRegister(FullName, PhoneNumber) {
    const query = `
                        INSERT INTO user_details (fullName, phoneNumber) 
                        VALUES (?, ?)`;
    const params = [FullName, PhoneNumber];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Thêm thông tin nhân viên khi thiết lập trang trại
   */
  static async InsertUserDetailWhenSetupFarm(fullName, gender, phoneNumber) {
    const query = `
                    INSERT INTO user_details (fullName, gender, phoneNumber)
                    VALUES (?, ?, ?)`;

    const params = [fullName, gender, phoneNumber];
    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Thêm 1 thông tin chi tiết người dùng
   */
  static async InsertUserDetail(
    FullName,
    DateOfBirth,
    Gender,
    CitizenIdentification_ID,
    Ward_ID,
    AddressDetail,
    Email,
    PhoneNumber
  ) {
    const query = `
                        INSERT INTO user_details (fullName, dateOfBirth, gender, citizenIdentification_id, ward_id, addressDetail, email, phoneNumber) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      FullName,
      DateOfBirth,
      Gender,
      CitizenIdentification_ID,
      Ward_ID,
      AddressDetail,
      Email,
      PhoneNumber,
    ];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Lấy danh sách toàn bộ thông tin người dùng
   */
  static async GetAllUserDetails() {
    const query = `
                        SELECT *
                        FROM user_details`;
    const params = [];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Lấy thông tin chi tiết của 1 người dùng
   */
  static async GetUserDetailsByID(id) {
    const query = `
                        SELECT *
                        FROM user_details
                        WHERE id = ?`;
    const params = [id];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Cập nhật thông tin cá nhân của người dùng
   */
  static async UpdateUserDetailByID(
    FullName,
    DateOfBirth,
    Gender,
    CitizenIdentification_ID,
    Ward_ID,
    AddressDetail,
    Email,
    PhoneNumber,
    id
  ) {
    const query = `
                        UPDATE user_details 
                        SET fullName = ?, dateOfBirth = ?, gender = ?, citizenIdentification_id = ?, ward_id = ?, addressDetail = ?, email = ?, phoneNumber = ?
                        WHERE id = ?`;

    const params = [
      FullName,
      DateOfBirth,
      Gender,
      CitizenIdentification_ID,
      Ward_ID,
      AddressDetail,
      Email,
      PhoneNumber,
      id,
    ];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Xóa thông tin cá nhân của người dùng
   */
  static async DeleteUserDetailByID(id) {
    const query = `DELETE FROM user_details WHERE id = ?`;
    const params = [id];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Model: Kiểm tra xem số căn cước, số điện thoại đã tồn tại hay chưa
   */
  static async CheckUserDetailExistsByCitizenIDOrPhone(
    CitizenIdentification_ID,
    phone
  ) {
    const query = ` SELECT *
                        FROM user_details
                        WHERE citizenIdentification_id = ?
                        OR phoneNumber = ?;`;

    const params = [CitizenIdentification_ID, phone];
    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Lấy danh sách người dùng dựa theo role trong 1 trang trại
   */
  static async GetUsersByRoleInFarm(role_id, farm_id) {
    const query = `
                        SELECT ua.id userAccount_id, ud.fullName
                        FROM user_accounts ua
                        JOIN user_roles ur ON ua.id = ur.userAccount_id
                        JOIN user_farms uf ON ua.id = uf.userAccount_id
                        JOIN user_details ud ON ua.userDetail_id = ud.id
                        WHERE ur.role_id = ? AND uf.farm_id = ?;`;

    const params = [role_id, farm_id];
    const result = await connection.query(query, params);

    const users = [];

    if (result.length === 0) {
      return null;
    }

    for (const row of result) {
      const user = new UserInfoModel(row.userAccount_id, row.fullName);
      users.push(user);
    }
    return users;
  }
}

module.exports = UserDetailRepository;
