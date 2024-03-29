const router = require("express").Router();
const AnimalTypeController = require("../controllers/AnimalTypeController");
// const { authenticateToken } = require('../middlewares/authMiddleware');
// const { authorize } = require('../middlewares/authorizeMiddleware');

router.get("/", AnimalTypeController.GetAllAnimalTypes);
// router.post('/', authenticateToken, authorize(['admin']), AnimalTypeController.InsertAnimalType);
// router.get('/:id', authenticateToken, authorize(['admin']), AnimalTypeController.GetAnimalTypesByID);
// router.put('/:id', authenticateToken, authorize(['admin']), AnimalTypeController.UpdateAnimalTypeByID);
// router.delete('/:id', authenticateToken, authorize(['admin']), AnimalTypeController.DeleteAnimalTypeByID);

module.exports = router;
