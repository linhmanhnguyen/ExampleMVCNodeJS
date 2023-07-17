const dotenv = require('dotenv');
const GetWeather = require('../utils/getWeatherData');

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
            res.status(200).json(
                {
                    "isSuccess": true,
                    "message": "Get weather successfully.",
                    "data": weatherData,
                }
            );
        } catch (error) {
            res.status(400).json(
                {
                    "isSuccess": false,
                    "message": `An error has occurred, please try again.`,
                }
            );
        }
    }


}

module.exports = WeatherController;