const { Router } = require('express');
const contentController = require('../controllers/contentController');
const { requireAuth, requirePermission } = require('../middlewares/auth');

const router = Router();

router.get('/', contentController.list);
router.post('/', requireAuth, requirePermission('content.manage'), contentController.create);
router.put('/:id', requireAuth, requirePermission('content.manage'), contentController.update);
router.delete('/:id', requireAuth, requirePermission('content.manage'), contentController.remove);

module.exports = router;
