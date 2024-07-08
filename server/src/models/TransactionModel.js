const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const user = require('./userModel');
const product = require('./ProductModel');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  OwnerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Referencing the User model for owner
      key: 'id'
    }
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Referencing the User model for user
      key: 'id'
    }
  },
  ProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products', // Referencing the Product model for item
      key: 'id'
    }
  },
  Type: {
    type: DataTypes.ENUM('Rent', 'Share', 'Purchase'),
    allowNull: false
  },
  Amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  }
});

// Define associations
Transaction.belongsTo(user, { foreignKey: 'OwnerId' });
Transaction.belongsTo(user, { foreignKey: 'UserId' });
Transaction.belongsTo(product, { foreignKey: 'ProductId' });

module.exports = Transaction;
