const connection = require("../configs/MySQLConnect");

class SupplierRepository {
  /**
   * Function Repository: Thêm thông tin người cung cấp
   */
  static async InsertSupplier(
    farm_id,
    name,
    phone,
    ward_id,
    addressDetail,
    supplyInventory_id
  ) {
    const query = `
                        INSERT INTO suppliers (farm_id, name, phone, ward_id, addressDetail, supplyInventory_id)
                        VALUES (?, ?, ?, ?)
                    `;

    const params = [
      farm_id,
      name,
      phone,
      ward_id,
      addressDetail,
      supplyInventory_id,
    ];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Lấy thông tin chi tiết của 1 người cung cấp
   */
  static async GetSupplierByID(id) {
    const query = `SELECT * FROM suppliers WHERE id = ?`;
    const params = [id];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Cập nhật thông tin của người cung cấp
   */
  static async UpdateSupplier(name, phone, ward_ID, addressDetail, id) {
    const query = `
                        UPDATE suppliers
                        SET name = ?, phone = ?, ward_id = ?, addressDetail = ?
                        WHERE id = ?
                    `;

    const params = [name, phone, ward_ID, addressDetail, id];

    const result = await connection.query(query, params);
    return result;
  }

  /**
   * Function Repository: Xóa thông tin người cung cấp
   */
  static async DeleteSupplier(id) {
    const query = `DELETE FROM suppliers WHERE id = ?`;
    const params = [id];

    const result = await connection.query(query, params);
    return result;
  }
}

module.exports = SupplierRepository;
