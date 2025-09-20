const router = require('express').Router();
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/admin');
const controller = require('../controllers/inventoryController');

router.post('/:id/purchase', auth, controller.purchase);
router.post('/:id/restock', auth, adminOnly, controller.restock);

module.exports = router;
