const express = require('express');
const router = express.Router();
const controller = require('../Controllers/userController');
const tryCatch = require('../Middleware/tryCatch');
const checkAuth = require('../Middleware/checkAuth');

router
    .post('/register', tryCatch(controller.register))
    .post('/login', tryCatch(controller.login))

    .get('/payment/success', tryCatch(controller.success))
    .post('/payment/cancel', tryCatch(controller.cancel))
    
    .get('/products', tryCatch(controller.getAllProducts))
    .get('/products/:id', tryCatch(controller.getProductById))
    .get('/products/category/:categoryname', tryCatch(controller.getProductsByCategory))
    
    .post('/:id/payment', tryCatch(controller.payment))
    
    .use(checkAuth(process.env.USER_ACCESS_TOKEN_SECRET))

    .get('/:id/cart', tryCatch(controller.showCart))
    .post('/:id/cart', tryCatch(controller.addToCart))
    .put('/:id/cart', tryCatch(controller.updateCartItemQuantity))
    .delete('/:id/cart/:product', tryCatch(controller.deleteFromCart))

    .get('/:id/wishlist', tryCatch(controller.showWishlist))
    .post('/:id/wishlist', tryCatch(controller.addToWishlist))
    .delete('/:id/wishlist/:product', tryCatch(controller.deleteFromWishlist))

    .get('/:id/orders', tryCatch(controller.showOrders))

module.exports = router;