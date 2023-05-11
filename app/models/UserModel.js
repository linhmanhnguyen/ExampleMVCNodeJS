const connection = require('../configs/MySQLConnect');
const bcrypt = require('bcrypt');

class UserModel {

    static async GetAllUsers() {
        const query = `SELECT * FROM users`;
        const params = [];

        const result = await connection.query(query, params);
        return result;
    }

    static async InsertUser(username, password) {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
        const params = [username, hashedPassword];

        const result = await connection.query(query, params);
        return result;
    }

    static async GetUserByUsername(username) {
        const query = `SELECT * FROM users WHERE username = ?`;
        const params = [username];

        const result = await connection.query(query, params);
        return result;
    }

    static async GetUserByID(id) {
        const query = `SELECT * FROM users WHERE ID = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result;
    }


    static async DeleteUserByID(id) {
        const query = `DELETE FROM users WHERE id = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result;
    }

    static async UpdateUserByID(username, password, id) {
        const query = `UPDATE users SET username = ?, password = ? WHERE id = ?`;
        const params = [username, password, id];

        const result = await connection.query(query, params);
        return result;
    }



}

module.exports = UserModel;