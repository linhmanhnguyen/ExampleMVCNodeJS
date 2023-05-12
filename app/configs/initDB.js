const connection = require('../configs/MySQLConnect')
const bcrypt = require('bcrypt');

async function createDatabaseAndAdmin() {
    try {
        await connection.init();

        // Tạo bảng roles nếu chưa tồn tại
        const createRoleTableQuery = `
        CREATE TABLE IF NOT EXISTS roles (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            role_name VARCHAR(255) NOT NULL
        );
        `;
        await connection.query(createRoleTableQuery)

        const checkAdminRoleExistQuery = `SELECT * FROM roles WHERE role_name = 'admin'`;
        const role_admin = await connection.query(checkAdminRoleExistQuery);
        if (role_admin.length === 0) {
            const createAdminRoleQuery = `INSERT INTO roles (role_name) VALUES ('admin')`;
            await connection.query(createAdminRoleQuery);
        }

        const checkOwnerRoleExistQuery = `SELECT * FROM roles WHERE role_name = 'owner'`;
        const role_owner = await connection.query(checkOwnerRoleExistQuery)
        if (role_owner.length === 0) {
            const createOwnerRoleQuery = `INSERT INTO roles (role_name) VALUES ('owner')`;
            await connection.query(createOwnerRoleQuery);
        }


        const checkManagerRoleExistQuery = `SELECT * FROM roles WHERE role_name = 'manager'`;
        const role_manager = await connection.query(checkManagerRoleExistQuery);
        if (role_manager.length === 0) {
            const createManagerRoleQuery = `INSERT INTO roles (role_name) VALUES ('manager')`;
            await connection.query(createManagerRoleQuery);
        }

        const checkStaffRoleExistQuery = `SELECT * FROM roles WHERE role_name = 'staff'`;
        const role_staff = await connection.query(checkStaffRoleExistQuery);
        if (role_manager.length === 0) {
            const createStaffRoleQuery = `INSERT INTO roles (role_name) VALUES ('staff')`;
            await connection.query(createStaffRoleQuery);
        }

        // Tạo bảng người dùng (users) nếu chưa tồn tại
        const createUserTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                fullname VARCHAR(255) NOT NULL,
                DOB DATE NOT NULL,
                address TEXT NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(255) NOT NULL,
                role_ID INT,
                FOREIGN KEY (role_ID) REFERENCES roles(ID)

            );
        `;
        await connection.query(createUserTableQuery);

        // Kiểm tra xem tài khoản admin đã tồn tại hay chưa
        const checkAdminExistQuery = `SELECT * FROM users WHERE username = 'admin'`;
        const admins = await connection.query(checkAdminExistQuery);

        // Nếu tài khoản admin chưa tồn tại, tạo mới
        if (admins.length === 0) {
            const username = process.env.ADMIN_DEFAULT_USERNAME;
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD, 10);
            const createAdminQuery = `INSERT INTO users (username, password, role_ID) VALUES ('${username}', '${hashedPassword}', 1)`;
            await connection.query(createAdminQuery);
        }

        // Tạo bảng trang trại (farms) nếu chưa tồn tại
        const createFarmTableQuery = `
                CREATE TABLE IF NOT EXISTS farms (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    farm_name VARCHAR(255) NOT NULL,
                    address TEXT NOT NULL,
                    date_created DATE NOT NULL,
                    owner_ID INT,
                    FOREIGN KEY (owner_ID) REFERENCES users(ID)
    
                );
            `;
        await connection.query(createFarmTableQuery);

        // Tạo bảng chuồng nuôi (pens) nếu chưa tồn tại
        const createAnimalTypeTableQuery = `
                CREATE TABLE IF NOT EXISTS animal_types (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    animal_type_name VARCHAR(255) NOT NULL
                );
            `;
        await connection.query(createAnimalTypeTableQuery);

        // Tạo bảng chuồng nuôi (pens) nếu chưa tồn tại
        const createPenTableQuery = `
                CREATE TABLE IF NOT EXISTS pens (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    pen_name VARCHAR(255) NOT NULL,
                    address TEXT NOT NULL,
                    animal_type_ID int,
                    FOREIGN KEY (animal_type_ID) REFERENCES animal_types(ID),
                    farm_ID INT,
                    FOREIGN KEY (farm_ID) REFERENCES farms(ID)
                );
            `;
        await connection.query(createPenTableQuery);

        console.log("Database initialization completed successfully.");
    } catch (error) {
        console.error("Error occurred during database initialization: ", error);
    }
}

module.exports = createDatabaseAndAdmin;