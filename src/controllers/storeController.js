// src/controllers/storeController.js
const Store = require('../models/Store');

exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter lojas' });
    }
};

exports.getStoreById = async (req, res) => {
    const { id } = req.params;
    try {
        const store = await Store.findByPk(id);
        if (store) {
            res.json(store);
        } else {
            res.status(404).json({ error: 'Loja não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter loja' });
    }
};

exports.createStore = async (req, res) => {
    const {name, description, backgroundColor, backgroundImage, profileImage } = req.body;
    try {
        const newStore = await Store.create({name, description, backgroundColor, backgroundImage, profileImage });
        res.status(201).json(newStore);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar loja' });
    }
};

exports.updateStore = async (req, res) => {
    const { id } = req.params;
    const { name, description, backgroundColor, backgroundImage, profileImage } = req.body;
    try {
        const store = await Store.findByPk(id);
        if (store) {
            store.name = name || store.name;
            store.description = description || store.description;
            store.backgroundColor = backgroundColor || store.backgroundColor;
            store.backgroundImage = backgroundImage || store.backgroundImage;
            store.profileImage = profileImage || store.profileImage;
            await store.save();
            res.json(store);
        } else {
            res.status(404).json({ error: 'Loja não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar loja' });
    }
};

exports.deleteStore = async (req, res) => {
    const { id } = req.params;
    try {
        const store = await Store.findByPk(id);
        if (store) {
            await store.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Loja não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar loja' });
    }
};
