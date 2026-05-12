const router = require('express').Router();
const ctrl   = require('../controllers/order.controller');
const auth   = require('../middleware/auth.middleware');

router.use(auth); // all order routes require login

router.post('/place',    ctrl.placeOrder);
router.get('/my',        ctrl.getMyOrders);
router.get('/:id',       ctrl.getOrder);
router.patch('/:id/pay', ctrl.markPaid);

module.exports = router;
