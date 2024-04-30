const sequelize = require("./postgres");
const { DataTypes, Model } = require("sequelize");
// Define Rate model
const Rate = sequelize.define('Rate', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = Rate;