const express = require("express");

const auth = require("../middleware/auth");
const multer = require("multer");
const bodyParser = require('body-parser');

const router = new express.Router();
const customerController = require("../controllers/customer");

router.use(bodyParser.urlencoded({ extended: true }));

//  Get plates with limit and offset
router.post("/plates", customerController.getPlates);

// Get all plates
router.get("/plates", customerController.getAllPlates);


// Add plate to cart                <<<<<<<<<<<Still need to be Fixed>>>>>>>>>>>>>>
router.post("/cart", customerController.addToCart);

// Get Categories
router.get("/categories", customerController.getCategories);

// Get Plates By Category
router.post("/category", customerController.getPlatesByCategory);




module.exports = router;

