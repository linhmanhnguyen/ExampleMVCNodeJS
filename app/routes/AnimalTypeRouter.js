const express = require('express');
const router = require('express').Router();

const AnimalTypeController = require('../controllers/AnimalTypeController');

router.post('/', AnimalTypeController.InsertAnimalType);
router.get('/', AnimalTypeController.GetAllAnimalTypes);
router.get('/:id', AnimalTypeController.GetAnimalTypesByID);
router.put('/:id', AnimalTypeController.UpdateAnimalTypeByID);
router.delete('/:id', AnimalTypeController.DeleteAnimalTypeByID);

module.exports = router;