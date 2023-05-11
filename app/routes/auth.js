const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/login', authController.Login)

module.exports = router;