const router = require('express').Router();
const cageController = require('../controllers/CageController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/authorizeMiddleware');

router.get('/:id', authenticateToken, authorize(['admin', 'owner']), cageController.GetCageByID);
router.put('/:id', authenticateToken, authorize(['admin', 'owner']), cageController.UpdateCageByID);

module.exports = router;