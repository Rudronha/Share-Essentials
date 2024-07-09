const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const user = require('./userModel');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  profilePicture: {
    type: DataTypes.BLOB('long'), // 'long' is optional, depending on database constraints
    allowNull: true // Allow null if profile picture is optional
  },
  isForSale: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  salePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true, // Allow null if not for sale
    defaultValue: null
  },
  isForRent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  rentPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true, // Allow null if not for rent
    defaultValue: null
  },
  isForShare: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  sharePrice: {      //prices for demage of product orother things
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true, // Allow null if not for rent
    defaultValue: null
  }
});

Product.belongsTo(user);

module.exports = Product;
