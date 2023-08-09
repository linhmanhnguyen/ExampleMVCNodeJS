const connection = require('../configs/MySQLConnect');

class HistoryCageEntryDetailRepository {
    /**
     * Function Repository: Thêm lịch sử chi tiết khi vừa thêm 1 đợt nhập chuồng
     */
    static async InsertHistory(cage_id, animalsEntry, historyEntryCage_id) {
        const query = `
                        INSERT INTO history_cage_entry_detail (cage_id, animalsEntry, historyEntryCage_id)
                        VALUES (?, ?, ?)
                    `;
        const params = [cage_id, animalsEntry, historyEntryCage_id];

        const result = await connection.query(query, params);
        return result;
    }
}

module.exports = HistoryCageEntryDetailRepository;