// src/routes/storeCustomizationRoutes.js
const express = require('express');
const router = express.Router();
const storeCustomizationController = require('../controllers/storeCustomizationController');

// Rotas para personalizações de loja
router.get('/storeCustomization', storeCustomizationController.getAllCustomizations);
router.get('/storeCustomization/:id', storeCustomizationController.getCustomizationById);
router.post('/storeCustomization', storeCustomizationController.createCustomization);
router.put('/storeCustomization/:id', storeCustomizationController.updateCustomization);
router.delete('/storeCustomization/:id', storeCustomizationController.deleteCustomization);

module.exports = router;
