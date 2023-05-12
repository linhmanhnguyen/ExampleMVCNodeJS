const express = require('express');
const router = require('express').Router();
const farmController = require('../controllers/FarmController');
const { authorizeRoles } = require('../middlewares/authorize');

router.get('/', authorizeRoles('admin', 'owner'), farmController.GetAllFarms);
router.post('/', authorizeRoles('admin', 'owner'), farmController.InsertFarm);
router.get('/:id', authorizeRoles('admin', 'owner'), farmController.GetFarmByID);
router.put('/:id', authorizeRoles('admin', 'owner'), farmController.UpdateFarm);
router.delete('/:id', authorizeRoles('admin', 'owner'), farmController.DeleteFarm);

module.exports = router;