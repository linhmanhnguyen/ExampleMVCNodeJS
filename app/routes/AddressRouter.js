const AddressController = require('../controllers/AddressController');
const router = require('express').Router();

router.get('/provinces', AddressController.GetAllProvinces);
router.get('/provinces/:id/districts', AddressController.GetAllDistrictsByProvince);
router.get('/districts/:id/wards', AddressController.GetAllWardsByDistrict);
router.get('/wards/:id', AddressController.GetAddressDetailsByWardID);

module.exports = router;