const express = require("express");

const auth = require("../middleware/auth");
const multer = require("multer");
const bodyParser = require('body-parser');

const router = new express.Router();
const userController = require("../controllers/user");

router.use(bodyParser.urlencoded({ extended: true }));

//              Login

router.post("/login",userController.loginUser);

//              Log Out for one User
router.post("/logout", auth, userController.logoutUser);

//              Logout For All Users (Tokens)
router.post("/logoutAll", auth, userController.logoutAllUsers);

//              Update User

router.patch("/users/me", auth, userController.updateUser);

//              Receive Orders
router.get("/users/me/orders", auth, userController.receiveOrders);

module.exports = router;
