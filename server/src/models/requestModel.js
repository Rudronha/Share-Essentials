// models/requestModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = require('./ProductModel');

const Request = sequelize.define('Request',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
});

Request.belongsTo(Product);

module.exports = Request;
