const express = require('express');
const router = require('express').Router();
const farmController = require('../controllers/FarmController');
const cageController = require('../controllers/CageController');
const animalController = require('../controllers/AnimalController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/authorizeMiddleware');

router.post('/', authenticateToken, authorize(['admin']), farmController.InsertFarm);
router.get('/', authenticateToken, authorize(['admin']), farmController.GetAllFarms);
router.get('/:id', authenticateToken, authorize(['admin']), farmController.GetFarmByID);
router.put('/:id', authenticateToken, authorize(['admin']), farmController.UpdateFarmByID);
router.delete('/:id', authenticateToken, authorize(['admin']), farmController.DeleteFarm);

router.post('/:id/cages', authenticateToken, authorize(['admin']), cageController.InsertCage);
router.get('/:id/cages', authenticateToken, authorize(['admin']), cageController.GetAllCagesInFarms);
router.get('/:id/cages/:cage_id', authenticateToken, authorize(['admin']), cageController.GetCageByID);
router.put('/:id/cages/:cage_id', authenticateToken, authorize(['admin']), cageController.UpdateCageByID);
router.delete('/:id/cages/:cage_id', authenticateToken, authorize(['admin']), cageController.DeleteCageByID);

router.post('/:id/cages/:cage_id/animals', authenticateToken, authorize(['admin']), animalController.InsertAnimal);
router.get('/:id/cages/:cage_id/animals', authenticateToken, authorize(['admin']), animalController.GetAllAnimalsInCage);
router.get('/:id/cages/:cage_id/animals/:animal_id', authenticateToken, authorize(['admin']), animalController.GetAnimalByID);
router.put('/:id/cages/:cage_id/animals/:animal_id', authenticateToken, authorize(['admin']), animalController.UpdateAnimalByID);
router.delete('/:id/cages/:cage_id/animals/:animal_id', authenticateToken, authorize(['admin']), animalController.DeleteAnimalByID);

router.post('/:id/cages/:cage_id/animals/:animal_id/transfer-cage', authenticateToken, authorize(['admin']), animalController.TrasnferCage);
router.get('/:id/cages/:cage_id/animals/:animal_id/transfer-cage', authenticateToken, authorize(['admin']), animalController.GetHistoiesTransferCageOfAnimal);
router.get('/:id/cages/:cage_id/animals/:animal_id/transfer-cage/:history_id', authenticateToken, authorize(['admin']), animalController.GetHistoryTransferCageOfAnimal);
router.delete('/:id/cages/:cage_id/animals/:animal_id/transfer-cage/:history_id', authenticateToken, authorize(['admin']), animalController.DeleteHistoryTransferCageOfAnimal);

module.exports = router;