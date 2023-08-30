const router = require('express').Router();
const farmController = require('../controllers/FarmController');
const cageController = require('../controllers/CageController');
const animalController = require('../controllers/AnimalController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/authorizeMiddleware');

router.post('/', authenticateToken, authorize(['admin', 'owner']), farmController.InsertFarm);
router.get('/', authenticateToken, authorize(['admin', 'owner']), farmController.GetAllFarms);
router.get('/:id', authenticateToken, authorize(['admin', 'owner']), farmController.GetFarmByID);
router.put('/:id', authenticateToken, authorize(['admin', 'owner']), farmController.UpdateFarmByID);
router.delete('/:id', authenticateToken, authorize(['admin']), farmController.DeleteFarm);

router.post('/:id/cages', authenticateToken, authorize(['admin', 'owner']), cageController.InsertCage);
router.post('/:id/cages/create-multiple', authenticateToken, authorize(['admin', 'owner']), cageController.InsertMultipleCages);
router.get('/:id/cages/:cage_id', authenticateToken, authorize(['admin', 'owner']), cageController.GetCageByID);
router.put('/:id/cages/:cage_id', authenticateToken, authorize(['admin', 'owner']), cageController.UpdateCageByID);
router.delete('/:id/cages/:cage_id', authenticateToken, authorize(['admin', 'owner']), cageController.DeleteCageByID);

router.post('/:id/cages/:cage_id/animals', authenticateToken, authorize(['admin', 'owner']), animalController.InsertAnimal);
router.get('/:id/cages/:cage_id/animals', authenticateToken, authorize(['admin']), animalController.GetAllAnimalsInCage);

router.post('/:id/users/create-multiple', authenticateToken, authorize(['admin', 'owner']), farmController.InsertMultipleUserToFarm);

router.get('/:id/report-animal-summary', authenticateToken, authorize(['admin', 'owner']), farmController.ReportAnimalSummary);
router.get('/:id/cage-summary', authenticateToken, authorize(['admin', 'owner']), farmController.GetCageSummary);
router.post('/:id/entry-cage', authenticateToken, authorize(['admin', 'owner']), farmController.InsertHistoryEntryCage);

router.get('/:id/get-animal-summary-of-each-cage', authenticateToken, authorize(['admin', 'owner']), farmController.GetAnimalSummaryOfEachCage);

router.get('/:id/events/:event_id/report-entry-cage', authenticateToken, authorize(['admin', 'owner']), farmController.ReportEntryCage);
router.get('/:id/classifications-statistics-of-animals', authenticateToken, authorize(['admin', 'owner']), farmController.ClassificationStatisticsOfAnimals);

router.post('/:id/buyers', authenticateToken, authorize(['admin', 'owner']), farmController.InsertBuyer);
router.post('/:id/sell-animals', authenticateToken, authorize(['admin', 'owner']), farmController.SellAnimals);

router.post('/:id/suppliers', authenticateToken, authorize(['admin', 'owner']), farmController.InsertSupplier);

router.get('/:id/employees', authenticateToken, authorize(['admin', 'owner']), farmController.GetEmployeesInFarm);
module.exports = router;
