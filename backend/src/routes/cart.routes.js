const router = require('express').Router();
const ctrl   = require('../controllers/cart.controller');
const auth   = require('../middleware/auth.middleware');

router.use(auth); // all cart routes require login

router.get('/',                   ctrl.getCart);
router.post('/add',               ctrl.addItem);
router.delete('/remove/:mediaId', ctrl.removeItem);
router.delete('/clear',           ctrl.clearCart);

module.exports = router;
