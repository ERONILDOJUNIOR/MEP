// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rotas para produtos
router.get('/product', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.post('/product', productController.createProduct);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;
