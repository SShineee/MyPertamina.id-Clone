const { Router } = require('express');
const benefitContentController = require('../controllers/benefitContentController');
const { requireAuth, requirePermission } = require('../middlewares/auth');

const router = Router();

router.get('/', benefitContentController.get);
router.put('/', requireAuth, requirePermission('content.manage'), benefitContentController.update);

module.exports = router;
