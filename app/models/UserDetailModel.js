const connection = require('../configs/MySQLConnect');
const bcrypt = require('bcrypt');

class UserDetailModel {

    /**
     * Function Model: Thêm 1 thông tin chi tiết người dùng
     */
    static async InsertUserDetail(FullName, DateOfBirth, Gender, CitizenIdentification_ID, Ward_ID, AddressDetail, Email, PhoneNumber) {

        const query = `
                        INSERT INTO UserDetails (FullName, DateOfBirth, Gender, CitizenIdentification_ID, Ward_ID, AddressDetail, Email, PhoneNumber) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [FullName, DateOfBirth, Gender, CitizenIdentification_ID, Ward_ID, AddressDetail, Email, PhoneNumber];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy danh sách toàn bộ thông tin người dùng
     */
    static async GetAllUserDetails() {
        const query = `
                        SELECT *
                        FROM UserDetails` ;
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
                        FROM UserDetails
                        WHERE ID = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Cập nhật thông tin cá nhân của người dùng
     */
    static async UpdateUserDetailByID(FullName, DateOfBirth, Gender, CitizenIdentification_ID, Ward_ID, AddressDetail, Email, PhoneNumber, id) {
        const query = `
                        UPDATE UserDetails 
                        SET FullName = ?, DateOfBirth = ?, Gender = ?, CitizenIdentification_ID = ?, Ward_ID = ?, AddressDetail = ?, Email = ?, PhoneNumber = ?
                        WHERE ID = ?`;

        const params = [FullName, DateOfBirth, Gender, CitizenIdentification_ID, Ward_ID, AddressDetail, Email, PhoneNumber, id];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Xóa thông tin cá nhân của người dùng
     */
    static async DeleteUserDetailByID(id) {
        const query = `DELETE FROM UserDetails WHERE ID = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Kiểm tra xem số căn cước, số điện thoại đã tồn tại hay chưa
     */
    static async CheckUserDetailExistsByCitizenIDOrPhone(CitizenIdentification_ID, phone) {
        const query = ` SELECT *
                        FROM UserDetails
                        WHERE CitizenIdentification_ID = ?
                        OR PhoneNumber = ?;`;

        const params = [CitizenIdentification_ID, phone];
        const result = await connection.query(query, params);
        return result;
    }
}

module.exports = UserDetailModel;