const { authenticateToken } = require("../middlewares/authMiddleware");
const router = require("express").Router();
const WeatherController = require("../controllers/WeatherController");

router.get("/", authenticateToken, WeatherController.getWeather);

module.exports = router;
