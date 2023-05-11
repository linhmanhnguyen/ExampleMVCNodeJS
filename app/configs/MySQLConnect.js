const mysql = require("mysql2/promise");
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

class Database {
    constructor() {
        this.connection = null;

        if (!Database.instance) {
            Database.instance = this;
        }

        return Database.instance;
    }

    async init() {
        if (this.connection == null) {
            this.connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            });
        }
    }

    async query(sql, params) {
        if (!this.connection) {
            throw new Error("Call init before using the database");
        }
        const [rows] = await this.connection.query(sql, params);
        return rows;
    }
}

const instance = new Database();
module.exports = instance;
