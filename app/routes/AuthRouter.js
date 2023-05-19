const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = require('express').Router();

router.post('/login', AuthController.Login);

module.exports = router;