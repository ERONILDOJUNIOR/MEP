// src/controllers/storeCustomizationController.js
const StoreCustomization = require('../models/StoreCustomization');

exports.getAllCustomizations = async (req, res) => {
    try {
        const customizations = await StoreCustomization.findAll();
        res.json(customizations);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter personalizações' });
    }
};

exports.getCustomizationById = async (req, res) => {
    const { id } = req.params;
    try {
        const customization = await StoreCustomization.findByPk(id);
        if (customization) {
            res.json(customization);
        } else {
            res.status(404).json({ error: 'Personalização não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter personalização' });
    }
};

exports.createCustomization = async (req, res) => {
    const { storeId, backgroundColor, backgroundImage, additionalLayoutSettings } = req.body;
    try {
        const newCustomization = await StoreCustomization.create({ storeId, backgroundColor, backgroundImage, additionalLayoutSettings });
        res.status(201).json(newCustomization);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar personalização' });
    }
};

exports.updateCustomization = async (req, res) => {
    const { id } = req.params;
    const { backgroundColor, backgroundImage, additionalLayoutSettings } = req.body;
    try {
        const customization = await StoreCustomization.findByPk(id);
        if (customization) {
            customization.backgroundColor = backgroundColor || customization.backgroundColor;
            customization.backgroundImage = backgroundImage || customization.backgroundImage;
            customization.additionalLayoutSettings = additionalLayoutSettings || customization.additionalLayoutSettings;
            await customization.save();
            res.json(customization);
        } else {
            res.status(404).json({ error: 'Personalização não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar personalização' });
    }
};

exports.deleteCustomization = async (req, res) => {
    const { id } = req.params;
    try {
        const customization = await StoreCustomization.findByPk(id);
        if (customization) {
            await customization.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Personalização não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar personalização' });
    }
};
