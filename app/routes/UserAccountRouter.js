const router = require("express").Router();
const UserAccountController = require("../controllers/UserAccountController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/authorizeMiddleware");

router.post(
  "/",
  authenticateToken,
  authorize(["admin"]),
  UserAccountController.InsertUserAccount
);
router.get(
  "/",
  authenticateToken,
  authorize(["admin"]),
  UserAccountController.GetAllUserAccounts
);
router.get("/:id", authenticateToken, UserAccountController.GetUserAccountByID);
router.put(
  "/:id",
  authenticateToken,
  UserAccountController.UpdateUserAccountByID
);
router.delete(
  "/:id",
  authenticateToken,
  authorize(["admin"]),
  UserAccountController.DeleteUserAccountByID
);

module.exports = router;
