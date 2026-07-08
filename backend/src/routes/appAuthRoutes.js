const { Router } = require('express');
const appAuthController = require('../controllers/appAuthController');

const router = Router();

router.post('/login', appAuthController.login);

module.exports = router;
