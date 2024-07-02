const express = require("express");
// const userServices = require("../services/admin")
const auth = require("../middleware/auth");
const multer = require("multer");
const bodyParser = require('body-parser');
const router = new express.Router();
const adminController = require('../controllers/admin')

router.use(bodyParser.urlencoded({ extended: true }));
//                            Admin
const uploadPlateImage = multer({
  limits: {
    fileSize: 4000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error("Please upload an Image file"));
    }
    cb(undefined, true);
  },
});
router.post("/admin/Plate",uploadPlateImage.single("Image"),auth ,adminController.addPlate);

//                    ADD Member
router.post("/admin/members",auth,adminController.addMember);

//                      Delete Member
router.delete("/admin/members:id", auth, adminController.deleteMember);

//                      return all members
router.get("/admin/members",auth,adminController.getAllMembers);

//                     Update Plate

router.patch("/admin/plate/:id",uploadPlateImage.single("Image"),auth,adminController.updatePlate);

//                      Delete Plate
router.delete("/admin/plate/:id",auth,adminController.deletePlate);

//                      Get Plate By ID
router.get("/admin/plate/:id",auth,adminController.getPlateById);

//                      Get Orders History
router.get("/admin/orders",auth,adminController.getOrders);

module.exports = router;