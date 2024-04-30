const express = require("express");

const auth = require("../middleware/auth");
const multer = require("multer");
const bodyParser = require('body-parser');

const router = new express.Router();
const userController = require("../controllers/user");

router.use(bodyParser.urlencoded({ extended: true }));

//              Login

router.post("/users/login",userController.loginUser);

//              Log Out for one User
router.post("/users/logout", auth, userController.logoutUser);

//              Logout For All Users (Tokens)
router.post("/users/logoutAll", auth, userController.logoutAllUsers);

//              Update User

router.patch("/users/me", auth, userController.updateUser);

module.exports = router;
