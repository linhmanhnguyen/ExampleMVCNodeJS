const connection = require('../configs/MySQLConnect');
const bcrypt = require('bcrypt');

class UserModel {

    /**
     * Function Model: Lấy danh sách tất cả các người dùng trong hệ thống
     */
    static async GetAllUsers() {
        const query = `
                        SELECT  users.ID, users.username, users.fullname, users.DOB, users.address, users.phone, users.email,
                                roles.role_name 
                        FROM users 
                        JOIN roles ON users.role_ID = roles.ID`;
        const params = [];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Thêm 1 người dùng vào hệ thống
     */
    static async InsertUser(username, password, fullname, DOB, address, phone, email, role_id) {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const query = `
                        INSERT INTO users (username, password, fullname, DOB, address, phone, email, role_ID) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [username, hashedPassword, fullname, DOB, address, phone, email, role_id];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy thông tin người dùng bằng tên tài khoản (chỉ dùng khi xử lý chức năng đăng nhập)
     */
    static async GetUserByUsername(username) {
        const query = `
                        SELECT  users.ID, users.username, users.password,
                                roles.role_name 
                        FROM users 
                        JOIN roles ON users.role_ID = roles.ID 
                        WHERE users.username = ?`;
        const params = [username];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy thông tin người dùng bằng ID của người dùng
     */
    static async GetUserByID(id) {
        const query = `
                        SELECT  users.ID, users.username, users.fullname, users.DOB, users.address, users.phone, users.email, 
                                roles.role_name 
                        FROM users 
                        JOIN roles ON users.role_ID = roles.ID 
                        WHERE users.ID = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Cập nhật thông tin cá nhân của người dùng
     */
    static async UpdateUserByID(password, fullname, DOB, address, phone, email, id) {
        const query = `
                        UPDATE users 
                        SET password = ?, fullname = ?, DOB = ?, address = ?, phone = ?, email = ?
                        WHERE id = ?`;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const params = [hashedPassword, fullname, DOB, address, phone, email, id];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Xóa thông tin người dùng khỏi hệ thống
     */
    static async DeleteUserByID(id) {
        const query = `DELETE FROM users WHERE id = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result;
    }
}

module.exports = UserModel;