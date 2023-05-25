const connection = require('../configs/MySQLConnect');
const bcrypt = require('bcrypt');

class UserAccountModel {

    /**
     * Function Model: Thêm thông tin tài khoản cho 1 người dùng
     */
    static async InsertUserAccount(Username, Password, CreateDate, UserDetail_ID, RefreshToken, Farm_ID) {

        const query = `
                        INSERT INTO useraccounts (Username, Password, CreateDate, UserDetail_ID, RefreshToken) 
                        VALUES (?, ?, ?, ?, ?)`;

        const hashedPassword = await bcrypt.hash(Password, 10);

        const params = [Username, hashedPassword, CreateDate, UserDetail_ID, RefreshToken, Farm_ID];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy toàn bộ danh sách tài khoản
     */
    static async GetAllUserAccounts() {
        const query = `SELECT ID, Username, CreateDate FROM useraccounts`;
        const params = [];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy thông tin chi tiết của 1 tài khoản bằng ID
     */
    static async GetUserAccountByID(id) {
        const query = `SELECT ID, Username, CreateDate FROM useraccounts WHERE ID = ?`;
        const params = [id];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Cập nhập thông tin chi tiết của 1 tài khoản bằng ID
     */
    static async UpdateUserAccountById(password, id) {
        const query = `
                        UPDATE useraccounts 
                        SET Password = ?
                        WHERE ID = ?`;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const params = [hashedPassword, id];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Xóa thông tin tài khoản trong 1 thông tin người dùng
     */
    static async DeleteUserAccountByID(id) {
        const query = `DELETE FROM useraccounts WHERE ID = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Gán tài khoản vừa được tạo với role ID
     */
    static async InsertRoleForUserAccount(UserAccount_ID, Role_ID, CreateDate, Status) {
        const query = `
                        INSERT INTO user_roles (UserAccount_ID, Role_ID, CreateDate, Status) 
                        VALUES (?, ?, ?, ?)`;
        const params = [UserAccount_ID, Role_ID, CreateDate, Status];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Gán tài khoản vào trang trại
     */
    static async InsertUserAccountToFarm(UserAccount_ID, Farm_ID, CreateDate, Status) {
        const query = `
                        INSERT INTO user_farms (UserAccount_ID, Farm_ID, CreateDate, Status) 
                        VALUES (?, ?, ?, ?)`;
        const params = [UserAccount_ID, Farm_ID, CreateDate, Status];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Tìm tài khoản bằng username
     */
    static async SearchUserAccountByUsername(username) {
        const query = ` SELECT useraccounts.id, useraccounts.Username, useraccounts.Password, 
                        user_roles.Role_ID, roles.RoleName, user_roles.Status 
                        FROM useraccounts 
                        JOIN user_roles ON useraccounts.id = user_roles.UserAccount_ID 
                        JOIN roles ON roles.id = user_roles.Role_ID 
                        WHERE useraccounts.Username = ?`;

        const params = [username];
        const result = await connection.query(query, params);
        return result;
    }

}

module.exports = UserAccountModel;