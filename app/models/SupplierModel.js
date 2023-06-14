const connection = require('../configs/MySQLConnect');

class SupplierModel {
    /**
     * Function Model: Thêm thông tin người cung cấp
     */
    static async InsertSupplier(name, phone, ward_ID, addressDetail) {
        const query = `
                        INSERT INTO Suppliers (Name, Phone, Ward_ID, AddressDetail)
                        VALUES (?, ?, ?, ?)
                    `;

        const params = [name, phone, ward_ID, addressDetail];

        const result = await connection.query(query, params);
        return result;

    }

    /**
     * Function Model: Lấy thông tin chi tiết của 1 người cung cấp
     */
    static async GetSupplierByID(id) {
        const query = `SELECT * FROM Suppliers WHERE ID = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result;
    }


    /**
     * Function Model: Cập nhật thông tin của người cung cấp
     */
    static async UpdateSupplier(name, phone, ward_ID, addressDetail, id) {

        const query = `
                        UPDATE Suppliers
                        SET Name = ?, Phone = ?, Ward_ID = ?, AddressDetail = ?
                        WHERE ID = ?
                    `;

        const params = [name, phone, ward_ID, addressDetail, id];

        const result = await connection.query(query, params);
        return result;
    }

    /**
     * Function Model: Xóa thông tin người cung cấp
     */
    static async DeleteSupplier(id) {
        const query = `DELETE FROM Suppliers WHERE ID = ?`;
        const params = [id];

        const result = await connection.query(query, params);
        return result;
    }

}

module.exports = SupplierModel;
