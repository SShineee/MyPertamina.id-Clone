const { Router } = require('express');
const contentController = require('../controllers/contentController');
const { requireAuth, requirePermission } = require('../middlewares/auth');
const { uploadPromo } = require('../middlewares/upload');

const router = Router();

router.get('/', contentController.list);
router.get('/slug/:slug', contentController.detail);

router.post('/', requireAuth, requirePermission('content.manage'), uploadPromo.single('image'), contentController.create);
router.put('/:id', requireAuth, requirePermission('content.manage'), uploadPromo.single('image'), contentController.update);

router.delete('/:id', requireAuth, requirePermission('content.manage'), contentController.remove);

module.exports = router;
