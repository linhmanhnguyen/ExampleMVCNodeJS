const express = require('express');
const router = require('express').Router();
const userController = require('../controllers/UserController');
const { authorizeRoles } = require('../middlewares/authorize');

router.get('/', authorizeRoles('admin'), userController.GetAllUsers);
router.post('/', authorizeRoles('admin'), userController.InsertUser);
router.get('/:id', authorizeRoles('owner'), userController.GetUserByID);
router.put('/:id', authorizeRoles('admin'), userController.UpdateUser);
router.delete('/:id', authorizeRoles('admin'), userController.DeleteUser);

module.exports = router;