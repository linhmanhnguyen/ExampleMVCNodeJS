const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = require('express').Router();

router.post('/login', AuthController.Login);
router.post('/register', AuthController.Register);
router.get('/checkExistUsername', AuthController.CheckExistUsername);
module.exports = router;