const { Router } = require('express');
const userDataController = require('../controllers/userDataController');
const { requireAppToken } = require('../middlewares/authMiddleware');

const router = Router();

router.use(requireAppToken);

router.get('/me', userDataController.me);
router.get('/balance', userDataController.balance);
router.get('/points', userDataController.points);
router.get('/vehicles', userDataController.listVehicles);
router.get('/transactions', userDataController.listTransactions);
router.get('/vouchers', userDataController.vouchers);
router.get('/notifications', userDataController.notifications);

module.exports = router;
