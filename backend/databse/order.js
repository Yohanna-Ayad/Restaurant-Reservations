const sequelize = require("./postgres");
const { DataTypes } = require("sequelize");

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending',
    allowNull: false,
  },
  tableId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'orders', // Ensure this matches the actual table name in your database
  timestamps: false,
});

module.exports = Order;
