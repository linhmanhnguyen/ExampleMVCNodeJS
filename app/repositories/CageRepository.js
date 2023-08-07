const connection = require('../configs/MySQLConnect');

class CageRepository {
    /**
     * Function Model: Thêm thông tin 1 chuồng nuôi vào trong trang trại
     */
    static async InsertCage(CageName, Farm_ID, Location, Manager_ID) {
        const query = `
        INSERT INTO cages (cageName, farm_id, location, manager_id) 
        VALUES (?, ?, ?, ?)`;
        const params = [CageName, Farm_ID, Location, Manager_ID];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy tất cả thông tin hiện có trong 1 trang trại
     */
    static async GetAllCagesInFarm(Farm_ID) {
        const query = `SELECT * FROM cages WHERE farm_id = ?`;
        const params = [Farm_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Lấy thông tin chi tiết của 1 chuồng nuôi trong 1 trang trại
     */
    static async GetCageByID(Cage_ID, Farm_ID) {
        const query = `SELECT * FROM Cages WHERE id = ? AND farm_id = ?`;
        const params = [Cage_ID, Farm_ID];
        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Cập nhật thông tin của 1 chuồng nuôi
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
     * Function Model: Xóa thông tin của 1 chuồng nuôi trong trang trại
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