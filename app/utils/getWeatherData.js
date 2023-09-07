const axios = require("axios");
const WeatherModel = require("../models/WeatherModel");

class GetWeather {
  static async GetWeatherData(latitude, longitude) {
    const apiKey = process.env.KEY_API_OPENWEATHERMAP;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const weatherData = response.data;

      // Trích xuất từ thông tin thời tiết từ response.data
      const description = weatherData.weather[0].main;
      const temperature = Math.trunc(weatherData.main.temp - 273.15);
      const icon = weatherData.weather[0].icon;
      const linkIcon = `https://openweathermap.org/img/wn/${icon}.png`;

      const weather = new WeatherModel(description, temperature, linkIcon);
      return weather;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }
}

module.exports = GetWeather;
