const express = require('express');
const AddressController = require('../controllers/AddressController');
const router = require('express').Router();

router.get('/provinces', AddressController.GetAllProvinces);
router.get('/provinces/:id/districts', AddressController.GetAllDistrictsByProvince);
router.get('/districts/:id/wards', AddressController.GetAllWardsByDistrict);

module.exports = router;