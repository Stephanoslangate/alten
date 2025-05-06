const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController')
const { protect } = require('../middlewares/auth');

router.use(protect);
router.get('/:userId', cartController.getOrCreateCart);
router.post('/:userId/items', cartController.addToCart);
router.delete('/:userId/items/:productId', cartController.removeFromCart);
router.put('/:userId/items/:productId', cartController.updateCartItemQuantity);
router.delete('/:userId/items', cartController.clearCart);
router.get('/:userId/details', cartController.getCartWithProducts);

module.exports = router;