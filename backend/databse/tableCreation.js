const sequelize = require("./postgres");
const User = require("./user");
const Plate = require("./plate");
const Order = require("./order");
const OrderItem = require("./OrderItem");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Define associations (if any are missing)
// For example, if User has associations:
// User.hasMany(Order);
// Order.belongsTo(User);

// Sync the models with the database
sequelize.sync({ force: false })
  .then(async () => {
    console.log("Tables created and associations established");

    // Create admin user if not exists
    const adminUser = {
      name: "Johan",
      email: "eng.yohannaayad@gmail.com",
      role: "admin",
      password: bcrypt.hashSync("admin", 10),
    };

    await User.findOrCreate({
      where: { email: adminUser.email },
      defaults: adminUser
    });

    // Insert data into Plate table if it's empty
    const platesData = require("./plates.json");
    if ((await Plate.count()) === 0) {
      await Plate.bulkCreate(platesData.plates);
      console.log("Plates table populated successfully.");
    } else {
      console.log("Plates table is already populated. Skipping data import.");
    }
  })
  .catch(error => {
    console.error("Error synchronizing models and establishing associations:", error);
  });
