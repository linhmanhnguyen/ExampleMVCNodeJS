const router = require("express").Router();
const animalController = require("../controllers/AnimalController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/authorizeMiddleware");

// Thông tin động vật
router.get(
  "/:id",
  authenticateToken,
  authorize(["admin"]),
  animalController.GetAnimalByID
);
router.put(
  "/:id",
  authenticateToken,
  authorize(["admin"]),
  animalController.UpdateAnimalByID
);
router.delete(
  "/:id",
  authenticateToken,
  authorize(["admin"]),
  animalController.DeleteAnimalByID
);

// Chuyển chuồng
router.post(
  "/:id/transfer-cage",
  authenticateToken,
  authorize(["admin"]),
  animalController.TrasnferCage
);
router.get(
  "/:id/transfer-cage",
  authenticateToken,
  authorize(["admin"]),
  animalController.GetHistoiesTransferCageOfAnimal
);
router.delete(
  "/:id/transfer-cage",
  authenticateToken,
  authorize(["admin"]),
  animalController.DeleteHistoriesTransferCageOfAnimal
);
router.get(
  "/:id/transfer-cage/:history_id",
  authenticateToken,
  authorize(["admin"]),
  animalController.GetHistoryTransferCageOfAnimal
);
router.delete(
  "/:id/transfer-cage/:history_id",
  authenticateToken,
  authorize(["admin"]),
  animalController.DeleteHistoryTransferCageOfAnimal
);

// Ghi chép tử hẹo
router.post(
  "/:id/animal-die",
  authenticateToken,
  authorize(["admin"]),
  animalController.InsertHistoryWhenAnimalDie
);
router.get(
  "/:id/animal-die",
  authenticateToken,
  authorize(["admin"]),
  animalController.GetHistoryAnimalDeath
);
router.delete(
  "/:id/animal-die",
  authenticateToken,
  authorize(["admin"]),
  animalController.DeleteHistoryAnimalDeath
);

// Ghi chép lịch sử cân nặng
router.post(
  "/:id/animal-weight",
  authenticateToken,
  authorize(["admin"]),
  animalController.InsertHistoryAnimalWeight
);
router.get(
  "/:id/animal-weight",
  authenticateToken,
  authorize(["admin"]),
  animalController.GetHistoriesAnimalWeight
);
router.delete(
  "/:id/animal-weight",
  authenticateToken,
  authorize(["admin"]),
  animalController.DeleteHistoriesAnimalWeight
);
router.get(
  "/:id/animal-weight/:history_id",
  authenticateToken,
  authorize(["admin"]),
  animalController.GetHistoryAnimalWeight
);
router.delete(
  "/:id/animal-weight/:history_id",
  authenticateToken,
  authorize(["admin"]),
  animalController.DeleteHistoryAnimalWeight
);

module.exports = router;
