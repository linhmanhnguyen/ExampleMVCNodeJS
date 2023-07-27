const dotenv = require('dotenv');
const GetWeather = require('../utils/getWeatherData');
const ReturnResponseUtil = require('../utils/returnResponse');

// Load environment variables from .env file
dotenv.config();

class WeatherController {
    /**
     * Function Controller: Lấy thông tin về thời tiết
     */
    static async getWeather(req, res) {
        const latitude = parseFloat(req.query.lat); // Lấy tham số lat từ query string
        const longitude = parseFloat(req.query.lon); // Lấy tham số lon từ query string

        try {
            const weatherData = await GetWeather.GetWeatherData(latitude, longitude);
            ReturnResponseUtil.returnResponse(res, 200, true, 'Get weather successfully', weatherData);

        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }


}

module.exports = WeatherController;