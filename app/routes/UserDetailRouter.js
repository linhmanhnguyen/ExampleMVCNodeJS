const router = require('express').Router();
const UserDetailController = require('../controllers/UserDetailController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/authorizeMiddleware');

router.post('/', authenticateToken, authorize(['admin']), UserDetailController.InsertUserDetail);
router.get('/', authenticateToken, authorize(['admin']), UserDetailController.GetAllUserDetails);
router.get('/:id', authenticateToken, UserDetailController.GetUserDetailsByID);
router.put('/:id', authenticateToken, UserDetailController.UpdateUserDetail);
router.delete('/:id', authenticateToken, authorize(['admin']), UserDetailController.DeleteUserDetail);

module.exports = router;