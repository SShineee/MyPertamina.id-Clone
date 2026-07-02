const { Router } = require('express');
const fuelPriceMatrixController = require('../controllers/fuelPriceMatrixController');
const { requireAuth, requirePermission } = require('../middlewares/auth');

const router = Router();

router.get('/', fuelPriceMatrixController.list);
router.post('/', requireAuth, requirePermission('price.update'), fuelPriceMatrixController.create);
router.put('/:id', requireAuth, requirePermission('price.update'), fuelPriceMatrixController.update);
router.delete('/:id', requireAuth, requirePermission('price.update'), fuelPriceMatrixController.remove);

module.exports = router;
