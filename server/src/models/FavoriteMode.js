const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./userModel');
const Product = require('./ProductModel');

const Favorite = sequelize.define('Favorite', {
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
  }
});

Favorite.belongsTo(User, { foreignKey: 'userId' });
Favorite.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Favorite;
