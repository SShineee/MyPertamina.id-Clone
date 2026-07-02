const { Router } = require('express');
const priceController = require('../controllers/priceController');
const { requireAuth, requirePermission } = require('../middlewares/auth');

const router = Router();

router.get('/', priceController.list);
router.post('/', requireAuth, requirePermission('price.update'), priceController.create);
router.put('/:id', requireAuth, requirePermission('price.update'), priceController.update);
router.delete('/:id', requireAuth, requirePermission('price.update'), priceController.remove);

module.exports = router;
