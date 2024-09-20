// src/controllers/productController.js
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter produtos' });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter produto' });
    }
};

exports.createProduct = async (req, res) => {
    const {name, description, price, category, productImage, stockQuantity, status } = req.body;
    try {
        const newProduct = await Product.create({name, description, price, category, productImage, stockQuantity, status });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, productImage, stockQuantity, status } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.productImage = productImage || product.productImage;
            product.stockQuantity = stockQuantity || product.stockQuantity;
            product.status = status || product.status;
            await product.save();
            res.json(product);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            await product.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }
};
