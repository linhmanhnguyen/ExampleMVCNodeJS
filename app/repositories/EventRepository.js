const connection = require('../configs/MySQLConnect');

class EventRepository {
    /**
     * Function Repository: Tạo 1 sự kiện mới
     */
    static async CreateEvent(startDate, endDate) {
        const query = `
            INSERT INTO events (startDate, endDate) VALUES (?, ?)`;
        const params = [startDate, endDate,];

        const result = await connection.query(query, params);
        return result;
    }



}

module.exports = EventRepository;