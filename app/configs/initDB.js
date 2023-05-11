const connection = require('../configs/MySQLConnect')
const bcrypt = require('bcrypt');

async function createDatabaseAndAdmin() {
    try {
        await connection.init();

        // Tạo bảng người dùng nếu chưa tồn tại
        const createUserTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('user', 'admin', 'owner') NOT NULL DEFAULT 'user'
            );
        `;
        await connection.query(createUserTableQuery)

        // Kiểm tra xem tài khoản admin đã tồn tại hay chưa
        const checkAdminExistQuery = `SELECT * FROM users WHERE username = 'admin'`;
        const admins = await connection.query(checkAdminExistQuery);

        // Nếu tài khoản admin chưa tồn tại, tạo mới
        if (admins.length === 0) {
            const username = process.env.ADMIN_DEFAULT_USERNAME;
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD, 10);
            const createAdminQuery = `INSERT INTO users (username, password, role) VALUES ('${username}', '${hashedPassword}', 'admin')`;
            await connection.query(createAdminQuery);
        }

        console.log("Database initialization completed successfully.");
    } catch (error) {
        console.error("Error occurred during database initialization: ", error);
    }
}

module.exports = createDatabaseAndAdmin;