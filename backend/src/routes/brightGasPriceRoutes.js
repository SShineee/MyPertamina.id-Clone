const { Router } = require('express');
const brightGasPriceController = require('../controllers/brightGasPriceController');
const { requireAuth, requirePermission } = require('../middlewares/auth');

const router = Router();

router.get('/', brightGasPriceController.list);
router.post('/', requireAuth, requirePermission('price.update'), brightGasPriceController.create);
router.put('/:id', requireAuth, requirePermission('price.update'), brightGasPriceController.update);
router.delete('/:id', requireAuth, requirePermission('price.update'), brightGasPriceController.remove);

module.exports = router;
