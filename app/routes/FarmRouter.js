const express = require('express');
const router = require('express').Router();
const farmController = require('../controllers/FarmController');

router.post('/', farmController.InsertFarm);
router.get('/', farmController.GetAllFarms);
router.get('/:id', farmController.GetFarmByID);
router.put('/:id', farmController.UpdateFarmByID);
router.delete('/:id', farmController.DeleteFarm);

module.exports = router;