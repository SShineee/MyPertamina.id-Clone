const { Router } = require('express');
const roleController = require('../controllers/roleController');
const { requireAuth, requirePermission } = require('../middlewares/auth');

const router = Router();

router.use(requireAuth, requirePermission('role.manage'));

router.get('/', roleController.list);
router.get('/permissions', roleController.listPermissions);
router.post('/', roleController.create);
router.put('/:id', roleController.update);
router.delete('/:id', roleController.remove);

module.exports = router;
