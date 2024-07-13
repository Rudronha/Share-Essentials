const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./userModel');
const Product = require('./ProductModel');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Cart;
