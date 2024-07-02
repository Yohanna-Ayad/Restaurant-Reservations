const sequelize = require("./postgres");
const { DataTypes } = require("sequelize");
const Order = require('./order');
const Plate = require('./plate');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  PlateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
}, {
  sequelize,
  modelName: 'OrderItem',
  tableName: 'order_items', // Ensure this matches the actual table name in your database
  timestamps: false,
});

// Establish associations
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
// OrderItem.hasMany(Plate, { foreignKey: 'orderItemId' }); // Adjust according to your Plate model
OrderItem.belongsTo(Plate, { foreignKey: 'PlateId' });
// Plate.belongsTo(OrderItem, { foreignKey: 'orderItemId' }); // Adjust according to your Plate model
Order.hasMany(OrderItem, { foreignKey: 'orderId' });


module.exports = OrderItem;
