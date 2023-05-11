const express = require('express');
const router = require('express').Router();
const userController = require('../controllers/UserController');
const { authorizeRoles } = require('../middlewares/authorize');

router.get('/', authorizeRoles('admin'), userController.GetAllUsers);
router.post('/', userController.InsertUser);
router.get('/:id', authorizeRoles('owner'), userController.GetUserByID);
router.put('/:id', userController.UpdateUser);
router.delete('/:id', userController.DeleteUser);

module.exports = router;