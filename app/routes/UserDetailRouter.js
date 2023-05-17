const express = require('express');
const router = require('express').Router();
const UserDetailController = require('../controllers/UserDetailController');
const { authorizeRoles } = require('../middlewares/authorize');

// router.get('/', authorizeRoles('admin'), userController.GetAllUsers);
// router.post('/', authorizeRoles('admin'), userController.InsertUser);
// router.get('/:id', authorizeRoles('owner'), userController.GetUserByID);
// router.put('/:id', authorizeRoles('admin'), userController.UpdateUser);
// router.delete('/:id', authorizeRoles('admin'), userController.DeleteUser);

router.post('/', UserDetailController.InsertUserDetail);
router.get('/', UserDetailController.GetAllUserDetails);
router.get('/:id', UserDetailController.GetUserDetailsByID);
router.put('/:id', UserDetailController.UpdateUserDetail);
router.delete('/:id', UserDetailController.DeleteUserDetail);

module.exports = router;