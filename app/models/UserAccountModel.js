const connection = require('../configs/MySQLConnect');
const bcrypt = require('bcrypt');

class UserAccountModel {

    /**
     * Function Model: Thêm thông tin tài khoản cho 1 người dùng
     */
    static async InsertUserAccount(Username, Password, CreateDate, Status, UserDetail_ID, RefreshToken, Farm_ID) {

        const query = `
                        INSERT INTO useraccounts (Username, Password, CreateDate, Status, UserDetail_ID, RefreshToken, Farm_ID) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;


        const hashedPassword = await bcrypt.hash(Password, 10);

        const params = [Username, hashedPassword, CreateDate, Status, UserDetail_ID, RefreshToken, Farm_ID];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy toàn bộ danh sách tài khoản
     */
    static async GetAllUserAccounts() {
        const query = `SELECT Username, CreateDate, Status FROM useraccounts`;
        const params = [];
        const result = await connection.query(query, params);
        return result;
    }


}

module.exports = UserAccountModel;