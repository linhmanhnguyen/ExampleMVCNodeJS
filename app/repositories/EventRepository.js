const connection = require('../configs/MySQLConnect');

class EventRepository {
    /**
     * Function Repository: Tạo 1 sự kiện mới
     */
    static async CreateEvent(startDate, endDate, status, farm_id) {
        const query = `
            INSERT INTO events (startDate, endDate, status, farm_id) VALUES (?, ?, ?, ?)`;
        const params = [startDate, endDate, status, farm_id];

        const result = await connection.query(query, params);
        return result;
    }

    // Hàm kiểm tra xem sự kiện có đang kích hoạt hay không
    static isEventActive(event) {
        return event && event.status === 1;
    }

    // Hàm kiểm tra xem đã có sự kiện liên quan đến việc nhập chuồng chưa
    static async getEventByFarm(farm_id) {
        const query = `SELECT * FROM events WHERE farm_id = ?`;
        const params = [farm_id];
        const result = await connection.query(query, params);
        return result;
    }


}

module.exports = EventRepository;