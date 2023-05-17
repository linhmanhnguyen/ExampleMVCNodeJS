const connection = require('../configs/MySQLConnect')

class DB_Animal {
    static async CreateAnimalTypesTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS animaltypes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            TypeName VARCHAR(255) NOT NULL
        );
        `;
        await connection.query(query);
    }
}

module.exports = DB_Animal;