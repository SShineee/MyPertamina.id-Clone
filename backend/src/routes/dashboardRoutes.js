const { Router } = require('express');
const dashboardController = require('../controllers/dashboardController');
const { requireAppToken } = require('../middlewares/authMiddleware');

const router = Router();

router.get('/dashboard', requireAppToken, dashboardController.dashboard);

module.exports = router;
