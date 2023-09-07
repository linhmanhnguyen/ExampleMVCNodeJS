const connection = require("../configs/MySQLConnect");
const CageModel = require("../models/CageModel");

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
  static async GetCageByID(cage_id) {
    const query = `
        SELECT
            ce1.employee_id AS livestockStaff_id,
            ce2.employee_id AS veterinaryStaff_id,
            COUNT(a.id) AS numberOfAnimalsInCage
        FROM
            cage_employees ce1
        LEFT JOIN
            cage_employees ce2 ON ce1.cage_id = ce2.cage_id
        LEFT JOIN
            animals a ON ce1.cage_id = a.cage_id
        WHERE
            ce1.cage_id = ? AND
            ce1.isLivestockStaff = true AND
            ce1.status = true AND
            ce2.isVeterinaryStaff = true AND
            ce2.status = true
        GROUP BY
            ce1.employee_id, ce2.employee_id;
        `;
    const params = [cage_id];
    const result = await connection.query(query, params);

    if (result.length === 0) {
      return null;
    }

    const cage = new CageModel(
      result[0].livestockStaff_id,
      result[0].veterinaryStaff_id,
      result[0].numberOfAnimalsInCage
    );
    return cage;
  }

  /**
   * Function Repository: Cập nhật thông tin của 1 chuồng nuôi
   */
  static async UpdateCageByID(
    CageName,
    Location,
    Manager_ID,
    Cage_ID,
    Farm_ID
  ) {
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

  /**
   * Function Repository: Lấy tổng số lượng chuồng nuôi trong 1 trang trại
   */
  static async GetTotalCages(Farm_ID) {
    const query = `SELECT COUNT(*) as totalCages FROM cages WHERE farm_id = ?`;
    const params = [Farm_ID];
    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Tìm nhân viên đang làm việc trong chuồng
   */
  static async SearchEmployeeInCage(cage_id, employee_id) {
    const query = `SELECT id FROM cage_employees WHERE cage_id = ? AND employee_id = ?`;
    const params = [cage_id, employee_id];
    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Cập nhật vai trò của nhân viên trong chuồng
   */
  static async UpdateStaffInCage(
    cage_id,
    employee_id,
    isLivestockStaff,
    isVeterinaryStaff,
    status,
    lastModified
  ) {
    const query = `UPDATE cage_employees SET isLivestockStaff = ?, isVeterinaryStaff = ?, status = ?, lastModified = ? WHERE cage_id = ? AND employee_id = ?`;
    const params = [
      isLivestockStaff,
      isVeterinaryStaff,
      status,
      lastModified,
      cage_id,
      employee_id,
    ];
    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Tạm thời vô hiệu hóa nhân viên trong chuồng
   */
  static async DisableEmployeeInCage(cage_id, lastModified) {
    const query = `UPDATE cage_employees SET status = false, lastModified = ? WHERE cage_id = ?`;
    const params = [lastModified, cage_id];
    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Thêm tài khoản vào trong 1 chuồng
   */
  static async InsertStaffToCage(
    employee_id,
    cage_id,
    dateStart,
    isLivestockStaff,
    isVeterinaryStaff,
    status,
    lastModified
  ) {
    const query = `
                        INSERT INTO cage_employees (employee_id, cage_id, dateStart, isLivestockStaff, isVeterinaryStaff, status, lastModified)
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      employee_id,
      cage_id,
      dateStart,
      isLivestockStaff,
      isVeterinaryStaff,
      status,
      lastModified,
    ];
    const result = await connection.query(query, params);
    return result;
  }
}

module.exports = CageRepository;
