// permissions.js
const Plate = require("./plate");
const sequelize = require("./postgres");
const { DataTypes, Model } = require('sequelize');

const Cart = sequelize.define( 'Cart',
  {
    Plate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Cart',
    tableName: 'Cart',
    timestamps: false,
  }
);

module.exports = Permissions;