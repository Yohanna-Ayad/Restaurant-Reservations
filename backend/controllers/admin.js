const adminService = require("../services/admin");

const adminController = {
  // Function to add news to the database         Done
  addPlate: async (req, res) => {
    try {
      // if (!req.user.permissions.includes(3)) {
      //   console.error("You do not have permission to perform this action!");
      //   return res.status(403).send({
      //     error: "You do not have permission to perform this action!",
      //   });
      // }
      // console.log("User have permission to add new Plate");
      payload = {
        PlateName: req.body.PlateName,
        Category: req.body.Category,
        Price: req.body.Price,
        Discount: req.body.Discount,
        Description: req.body.Description,
        Image: req.file.buffer,
      };
      const result = await adminService.addPlate(payload);
      if (
        result === "All fields are required!" ||
        result === "No image uploaded." ||
        result === "Price must be greater than 0"
      ) {
        return res.status(400).send({
          error: result,
        });
      }
      if (result === "Plate already exist!") {
        return res.status(409).send({
          error: result,
        });
      }
      res
        .status(201)
        .send({ message: "Plate Created successful!", plate: result });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  // Function to update plate in the database       Done
  updatePlate: async (req, res) => {
    try {
      // if (!req.user.permissions.includes(3)) {
      //   console.error("You do not have permission to perform this action!");
      //   return res.status(403).send({
      //     error: "You do not have permission to perform this action!",
      //   });
      // }
      // console.log("User have permission to update Plate");
      const plateId = req.params.id;
      
      // console.log(payload)
      // console.log(req.file.buffer)
      const payload = {
        PlateName: req.body.PlateName,
        Category: req.body.Category,
        Price: req.body.Price,
        Discount: req.body.Discount,
        Description: req.body.Description,
        Image: req.file.buffer,
      };
      const result = await adminService.updatePlate(plateId, payload);
      if (result === "Plate Name is required!" || result === "Invalid updates!" || result === "All fields are required!" || result === "Price must be greater than 0") {
        console.log({ "error": result})
        return res.status(400).send({
          error: result,
        });
      }
      else if (result === "Plate not found" || result === "No updates provided!") {
        console.log({ "error": result})
        return res.status(404).send({
          error: result,
        });
      }
      else {
        res.status(200).send({ message: "Plate Updated successful!", plate: result });
      }
      // res.status(200).send({ message: "Plate Updated successful!", plate: result });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  // Function to add member to the database       Done
  addMember: async (req, res) => {
    // if (!req.user.permissions.includes(2)) {
    //   console.error("You do not have permission to perform this action!");
    //   return res.status(403).send({
    //     error: "You do not have permission to perform this action!",
    //   });
    // }
    // console.log("User have permission to add member");
    try {
      const payload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        // permission: req.body.permissions,
      };
      // console.log(payload)

      const result = await adminService.addMember(payload);

      if (
        result === "All fields are required!" ||
        result === "Password must be at least 8 characters!" ||
        result === "Failed to create user!" ||
        // result === "Permission is required!" ||
        result === "Role does not exist!"
      ) {
        // throw new ValidationError(result);
        return res.status(400).send({
          error: result,
        });
      }
      if (result === "Account Already Exist") {
        return res.status(409).send({
          error: result,
        });
      }
      return res.status(201).send({ message: "User Created successful!", user: result });
    } catch (error) {
      console.error(error);
      return res.status(400).send({ error: error.message });
    }
  },
  // Function to delete member from the database     Done
  deleteMember: async (req, res) => {
    if (req.user.role !== "admin") {
      console.error("You do not have permission to perform this action!");
      return res.status(403).send({
        error: "You do not have permission to perform this action!",
      });
    }
    // if (!req.user.permissions.includes(2)) {
    //   console.error("You do not have permission to perform this action!");
    //   return res.status(403).send({
    //     error: "You do not have permission to perform this action!",
    //   });
    // }
    // console.log("User have permission to delete member");
    // if (!req.body.email) {
    //   console.error("Email is required!");
    //   return res.status(400).send({
    //     error: "Email is required!",
    //   });
    // }
    // if (req.body.email === req.user.email) {
    //   console.error("You cannot delete yourself!");
    //   return res.status(403).send({
    //     error: "You cannot delete yourself!",
    //   });
    // }
    try {
      // console.log(req.params.id)
      const result = await adminService.deleteMember(req.params.id);
      if (result === "User not found") {
        return res.status(404).send({
          error: result,
        });
      }
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  replaceImage: async (req, res) => {
    console.log(req.user.avatar)
    if (req.user.avatar) {
      console.log("user have avatar and wants to replace")
    const user = await userServices.replaceAvatar(req.user, req.file);
    if (user === 'No image to replace with') {
      return res.status(400).send({"message":"No image to replace with"});
    }
    res.send({"message":"Avatar replaced", user: user});
  } else{
    console.log("user does not have avatar")
    const user = await userServices.uploadAvatar(req.user, req.file);
    res.send({"message":"Avatar uploaded", user: user});
  }
  },
  getAllMembers: async (req, res) => {
    try {
      const members = await adminService.getAllMembers();
      if (!members) {
        return res.status(404).send({ error: "No member found" });
      }
      res.status(200).send({message: "Members found", members});
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  deletePlate: async (req, res) => {
    try {
      const result = await adminService.deletePlate(req.params.id);
      if (result === "Plate not found") {
        return res.status(404).send({ error: result });
      }
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  getPlateById: async (req, res) => {
    try {
      const plate = await adminService.getPlateById(req.params.id);
      if (!plate) {
        return res.status(404).send({ error: "Plate not found" });
      }
      res.status(200).send({ message: "Plate found", plate });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};

module.exports = adminController;
