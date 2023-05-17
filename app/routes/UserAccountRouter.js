const express = require('express');
const router = require('express').Router();
const UserAccountController = require('../controllers/UserAccountController');

router.post('/', UserAccountController.InsertUserAccount);
router.get('/', UserAccountController.GetAllUserAccounts);



module.exports = router;