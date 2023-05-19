const express = require('express');
const router = require('express').Router();
const farmController = require('../controllers/FarmController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/authorizeMiddleware');

router.post('/', authenticateToken, authorize("admin"), farmController.InsertFarm);
router.get('/', authenticateToken, authorize('admin'), farmController.GetAllFarms);
router.get('/:id', authenticateToken, authorize('admin'), farmController.GetFarmByID);
router.put('/:id', authenticateToken, authorize('admin'), farmController.UpdateFarmByID);
router.delete('/:id', authenticateToken, authorize('admin'), farmController.DeleteFarm);

module.exports = router;