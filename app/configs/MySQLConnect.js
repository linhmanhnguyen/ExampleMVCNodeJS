const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

class Database {
  constructor() {
    if (!Database.instance) {
      this._initConnection();
      Database.instance = this;
    }

    return Database.instance;
  }

  async _initConnection() {
    this.connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // port: process.env.DB_PORT,
    });
  }

  async query(sql, params) {
    const [rows] = await this.connection.query(sql, params);
    return rows;
  }
}

const instance = new Database();
module.exports = instance;
