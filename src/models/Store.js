const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Store = sequelize.define('Store', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' }, allowNull: false, unique: true }, // Unique per seller
}, {
    timestamps: true,
});

module.exports = Store;
