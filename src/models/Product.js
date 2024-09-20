const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Store = require('./Store');

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.TEXT, allowNull: true },
    preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    storeId: { type: DataTypes.INTEGER, references: { model: Store, key: 'id' }, allowNull: false }, // Linked to store
}, {
    timestamps: true,
});

module.exports = Product;
