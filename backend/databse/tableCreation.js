const User = require("./user");
const Permissions = require("./permissions");
const UserPermission = require("./userPermissions");
const Plate = require("./plate");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Establish associations
// User.belongsToMany(Permissions, { through: UserPermission });
// Permissions.belongsToMany(User, { through: UserPermission });

const sequelize = require("./postgres");
// Sync the models with the database
sequelize
  .sync({ force: false }) // Set force: true only for development; it drops existing tables
  .then(async () => {
    console.log("Tables created and associations established");
    // Define associations between tables
    // const permissionsData = [
    //   { permission: "Add_edit_new_recipe" },
    //   { permission: "Receive_order" },
    //   { permission: "Add_delete_user" },
    // ];

    // permissionsData.forEach(async (permission) => {
    //   await Permissions.findOrCreate({
    //     where: { permission: permission.permission },
    //     defaults: permission,
    //   });
    // });

    const adminUser = {
      name: "Johan",
      email: "eng.yohannaayad@gmail.com",
      role: "admin",
      password: bcrypt.hashSync("admin", 10),
    };

    User.findOne({ where: { email: adminUser.email } })
      .then((user) => {
        if (!user) {
          // User not found, create it or handle the situation as needed
          console.log("User not found. Creating a new user...");
          // Example of creating a new user
          User.create(adminUser)
          // .then((newUser) => {
            // Permissions.findAll().then((permissions) => {
            //   newUser.addPermissions(permissions).then(() => {
            //     console.log("Permissions added to the new user.");
            //   });
            // });
          // });
        } else {
          // User found, add permissions
          // Permissions.findAll().then((permissions) => {
          //   user.addPermissions(permissions).then(() => {
          //     console.log("Permissions added to the existing user.");
          //   });
          // });
        }
      })
      .catch((error) => {
        console.error("Error finding or creating user:", error);
      });
      // Insert data into Plate table
    if ((await Plate.count()) > 0) {
      console.log("Plates table is already populated. Skipping data import.");
    } else {
      const platesData = require("./plates.json");
      platesData.plates.forEach(async (plate) => {
        await Plate.create({
          PlateName: plate.PlateName,
          Price: plate.Price,
          Discount: plate.Discount,
          Image: plate.Image,
          Description: plate.Description,
          Category: plate.Category,
        });
      });
    }
  });
