const { Router } = require('express');
const userController = require('../controllers/userController');
const { requireAuth, requirePermission } = require('../middlewares/auth');

const router = Router();

router.use(requireAuth, requirePermission('user.manage'));

router.get('/', userController.list);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.put('/:id/password', userController.resetPassword);
router.delete('/:id', userController.remove);

module.exports = router;
