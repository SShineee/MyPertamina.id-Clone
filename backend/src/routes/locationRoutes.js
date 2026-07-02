const { Router } = require('express');
const locationController = require('../controllers/locationController');

const router = Router();

router.get('/:channel', locationController.list);

module.exports = router;
