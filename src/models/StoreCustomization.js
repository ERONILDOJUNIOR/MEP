const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Store = require('./Store');

const StoreCustomization = sequelize.define('StoreCustomization', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    themeColor: { type: DataTypes.STRING, allowNull: false },
    logo: { type: DataTypes.STRING, allowNull: true },
    storeId: { type: DataTypes.INTEGER, references: { model: Store, key: 'id' }, allowNull: false, unique: true }, // Unique per store
}, {
    timestamps: true,
});

module.exports = StoreCustomization;
