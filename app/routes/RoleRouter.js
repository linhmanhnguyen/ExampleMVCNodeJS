const express = require('express');
const router = require('express').Router();

const RoleController = require('../controllers/RoleController');
router.get('/', RoleController.GetAllRoles);

module.exports = router;