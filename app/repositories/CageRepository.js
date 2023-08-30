const connection = require('../configs/MySQLConnect');
const CageModel = require('../models/CageModel');

class CageRepository {
    /**
     * Function Repository: Thêm thông tin 1 chuồng nuôi vào trong trang trại
     */
    static async InsertCage(cageName, farm_id, location, manager_id) {
        const query = `
        INSERT INTO cages (cageName, farm_id, location, manager_id) 
        VALUES (?, ?, ?, ?)`;
        const params = [cageName, farm_id, location, manager_id];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Repository: Lấy tất cả thông tin hiện có trong 1 trang trại
     */
    static async GetAllCagesInFarm(Farm_ID) {
        const query = `SELECT * FROM cages WHERE farm_id = ?`;
        const params = [Farm_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Repository: Lấy thông tin chi tiết của 1 chuồng nuôi trong 1 trang trại
     */
    static async GetCageByID(Cage_ID) {
        const queryGetLivetockStaffInCage = `SELECT * FROM cage_employees WHERE cage_id = ? AND isLivestockStaff = true AND status = true`;
        const paramsGetLivetockStaffInCage = [Cage_ID];
        const resultGetLivetockStaffInCage = await connection.query(queryGetLivetockStaffInCage, paramsGetLivetockStaffInCage);

        const queryGetVeterinaryStaffInCage = `SELECT * FROM cage_employees WHERE cage_id = ? AND isVeterinaryStaff = true AND status = true`;
        const paramsGetVeterinaryStaffInCage = [Cage_ID];
        const resultGetVeterinaryStaffInCage = await connection.query(queryGetVeterinaryStaffInCage, paramsGetVeterinaryStaffInCage);

        if (resultGetLivetockStaffInCage.length === 0 && resultGetVeterinaryStaffInCage.length === 0) {
            return null;
        }

        const cage = new CageModel(resultGetLivetockStaffInCage[0].employee_id, resultGetVeterinaryStaffInCage[0].employee_id);

        return cage;
    }

    /**
     * Function Repository: Cập nhật thông tin của 1 chuồng nuôi
     */
    static async UpdateCageByID(CageName, Location, Manager_ID, Cage_ID, Farm_ID) {
        const query = `
                        UPDATE cages 
                        SET cageName = ?, location = ?, manager_id = ?
                        WHERE id = ?  AND farm_id = ?`;

        const params = [CageName, Location, Manager_ID, Cage_ID, Farm_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Repository: Xóa thông tin của 1 chuồng nuôi trong trang trại
     */
    static async DeleteCageByID(Cage_ID, Farm_ID) {
        const query = `DELETE FROM cages WHERE id = ? AND farm_id = ?`;
        const params = [Cage_ID, Farm_ID];
        const result = await connection.query(query, params);
        return result;
    }

    static async GetTotalCages(Farm_ID) {
        const query = `SELECT COUNT(*) as totalCages FROM cages WHERE farm_id = ?;`;
        const params = [Farm_ID];
        const result = await connection.query(query, params);
        return result;
    }


}

module.exports = CageRepository;