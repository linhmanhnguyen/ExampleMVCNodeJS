const connection = require('../configs/MySQLConnect')

class DB_User {
    static async CreateRoleTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS roles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            RoleName VARCHAR(255) NOT NULL
        );
        `;
        await connection.query(query)
    }

    static async InsertRoles() {
        const query = `
        INSERT INTO roles (RoleName) VALUES ('admin'), ('owner'), ('manager'), ('staff');
        `;
        await connection.query(query)
    }

    static async CreateUserDetailsTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS userdetails (
            id INT AUTO_INCREMENT PRIMARY KEY,
            FullName VARCHAR(255) NOT NULL,
            DateOfBirth DATE NOT NULL,
            Gender VARCHAR(255) NOT NULL,
            CitizenIdentification_ID VARCHAR(255) NOT NULL,
            AddressDetail TEXT NOT NULL,
            Email VARCHAR(255) NOT NULL,
            Phone VARCHAR(255) NOT NULL,
            Ward_ID int
        );
    `;
        await connection.query(query);
    }

    static async CreateUserAccountsTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS useraccounts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            Username VARCHAR(255) NOT NULL,
            Password VARCHAR(255) NOT NULL,
            CreateDate DATE NOT NULL,
            Status BOOLEAN,
            UserDetail_ID int NOT NULL,
            RefreshToken TEXT,
            Farm_ID int NULL
        );
    `;
        await connection.query(query);
    }

    static async CreateUserRolesTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS user_roles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            UserAccount_ID int NOT NULL,
            Role_ID int NOT NULL,
            FOREIGN KEY (Role_ID) REFERENCES roles(id),
            CreateDate DATE NOT NULL,
            Status BOOLEAN
        );
        `;
        await connection.query(query);
    }
}

module.exports = DB_User;