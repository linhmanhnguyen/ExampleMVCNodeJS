const express = require('express');
const router = require('express').Router();
const UserAccountController = require('../controllers/UserAccountController');

router.post('/', UserAccountController.InsertUserAccount);
router.get('/', UserAccountController.GetAllUserAccounts);
router.get('/:id', UserAccountController.GetUserAccountByID);
router.put('/:id', UserAccountController.UpdateUserAccountByID);
router.delete('/:id', UserAccountController.DeleteUserAccountByID);

module.exports = router;