// user.js
const sequelize = require("./postgres");
const { DataTypes, Model } = require("sequelize");
const validator = require("validator");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      defaultValue: "user",
      values: ["user", "admin"]
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter a valid E-mail!");
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        len: [7, 100],
        notContains: "password",
      },
    },
    tokens: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "User",
    timestamps: true,
  }
);

module.exports = User;
