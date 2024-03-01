const express = require('express');
const router = express.Router();
const controller = require('../Controllers/adminController');
const tryCatch = require('../Middleware/tryCatch');
const checkAuth = require('../Middleware/checkAuth');

router
  .post('/login', tryCatch(controller.login))
  .use(checkAuth(process.env.ADMIN_ACCESS_TOKEN_SECRET))

  .get('/users', tryCatch(controller.getAllUsers))
  .get('/users/:id', tryCatch(controller.getUserById))

  .get('/products/category', tryCatch(controller.getProductsByCategory))
  .get('/products', tryCatch(controller.getAllProducts))
  .get('/products/:id', tryCatch(controller.getProductById))
  .post('/products', tryCatch(controller.createProduct))
  .put('/products', tryCatch(controller.updateProduct))
  .delete('/products/:id', tryCatch(controller.deleteProduct))

  .get('/stats', tryCatch(controller.getStats))
  .get('/orders', tryCatch(controller.getOrders));

module.exports = router;
