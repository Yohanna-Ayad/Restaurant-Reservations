// permissions.js
const sequelize = require("./postgres");
const { DataTypes, Model } = require('sequelize');

const Permissions = sequelize.define( 'Permission',
  {
    permission: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Permission',
    tableName: 'Permission',
    timestamps: false,
  }
);

module.exports = Permissions;