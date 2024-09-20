// src/routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Rotas para lojas
router.get('/stores', storeController.getAllStores);
router.get('/stores/:id', storeController.getStoreById);
router.post('/stores', storeController.createStore);
router.put('/stores/:id', storeController.updateStore);
router.delete('/stores/:id', storeController.deleteStore);

module.exports = router;
