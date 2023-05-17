const connection = require('../configs/MySQLConnect')
const bcrypt = require('bcrypt');
const DB_Vietnam = require('../inits_DB/DB_Vietnam');
const DB_Animal = require('../inits_DB/DB_Animal');
const DB_Farm = require('../inits_DB/DB_Farm');
const DB_User = require('../inits_DB/DB_User');

async function createDatabaseAndAdmin() {
    try {
        await connection.init();

        await DB_Vietnam.CreateProvinceTable();
        await DB_Vietnam.CreateDistrictTable();
        await DB_Vietnam.CreateWardsTable();
        await DB_Vietnam.InsertDataProvinces();
        await DB_Vietnam.InsertDataDistricts();
        await DB_Vietnam.InsertDataWards();

        await DB_Animal.CreateAnimalTypesTable();

        await DB_User.CreateRoleTable();
        await DB_User.InsertRoles();
        await DB_User.CreateUserDetailsTable();
        await DB_User.CreateUserAccountsTable();
        await DB_Farm.CreateFarmTable();
        await DB_User.CreateUserRolesTable();

        console.log("Database initialization completed successfully.");
    } catch (error) {
        console.error("Error occurred during database initialization: ", error);
    }
}

module.exports = createDatabaseAndAdmin;