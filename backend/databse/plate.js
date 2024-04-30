const sequelize = require("./postgres");
const { DataTypes, Model } = require("sequelize");
// Define Plate model
const Plate = sequelize.define('Plate', {
    PlateName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: true,
    },
    Image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  

module.exports = Plate;