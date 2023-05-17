const connection = require('../configs/MySQLConnect')

class DB_Farm {
    static async CreateFarmTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS farms (
            id INT AUTO_INCREMENT PRIMARY KEY,
            FarmName varchar(255) NOT NULL,
            CreateDate DATE NOT NULL,
            Status BOOLEAN,
            AnimalType_ID int NOT NULL,
            AnimalDensity int NOT NULL,
            Ward_ID int NOT NULL,
            AddressDetail text NULL,
            LastModified datetime NOT NULL
        );
        `;
        await connection.query(query);
    }


}

module.exports = DB_Farm;