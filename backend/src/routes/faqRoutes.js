const { Router } = require('express');
const faqController = require('../controllers/faqController');
const { requireAuth, requirePermission } = require('../middlewares/auth');

const router = Router();

router.get('/', faqController.list);
router.post('/', requireAuth, requirePermission('content.manage'), faqController.create);
router.put('/:id', requireAuth, requirePermission('content.manage'), faqController.update);
router.delete('/:id', requireAuth, requirePermission('content.manage'), faqController.remove);

module.exports = router;
