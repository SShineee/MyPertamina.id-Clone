const { Router } = require('express');
const sustainabilityController = require('../controllers/sustainabilityController');

const router = Router();

router.get('/facility-stats', sustainabilityController.listFacilityStats);
router.get('/ucollect-locations', sustainabilityController.listUcollectLocations);

module.exports = router;
