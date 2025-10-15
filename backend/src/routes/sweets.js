const router = require('express').Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const controller = require('../controllers/sweetsController');

router.post('/', authenticateToken, requireAdmin, controller.create);
router.get('/', controller.list);
router.get('/search', controller.search);
router.get('/:id', controller.show);
router.post('/:id/purchase', authenticateToken, controller.purchase);
router.put('/:id', authenticateToken, requireAdmin, controller.update);
router.delete('/:id', authenticateToken, requireAdmin, controller.delete);

module.exports = router;
