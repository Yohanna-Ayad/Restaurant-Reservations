const express = require("express");

const auth = require("../middleware/auth");
const multer = require("multer");
const bodyParser = require('body-parser');

const router = new express.Router();
const customerController = require("../controllers/customer");

router.use(bodyParser.urlencoded({ extended: true }));


router.post("/plates", customerController.getPlates);

router.post("/cart", customerController.addToCart);



module.exports = router;

