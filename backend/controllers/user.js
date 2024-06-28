const userServices = require("../services/user");

const userController = {
  // Function to login a user       Done
  loginUser: async (req, res) => {
    try {
      // console.log(req.body.email, req.body.password)
      const user = await userServices.loginUser(
        req.body.email,
        req.body.password
      );
      if (user === "Email and password are required!") {
        return res.status(400).send({ error: user });
      }
      console.log(user);
      res.send({ message: "Login successful", user });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  // Function to verify a user account      Done
  verifyUser: async (req, res) => {
    try {
      // console.log(req.user);
      const result = await mailer.verifyCode(req.user.email, req.body.code);
      if (!result) {
        return res.status(400).send({ error: "Invalid verification code" });
      }
      req.user.verified = true;
      await req.user.save();
      res.status(200).send({ message: "Verification successful" });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  // Function to logout a user       Done
  logoutUser: async (req, res) => {
    try {
      await userServices.logoutUser(req.user, req.token);
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  },
  // Function to logout all users       Done
  logoutAllUsers: async (req, res) => {
    try {
      await userServices.logoutAllUsers(req.user);
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  },
  // Function to update user profile       Done
  updateUser: async (req, res) => {
    try {
      var user = await userServices.updateUser(req.user, req.body);
      if (user === "Invalid updates!") {
        return res.status(400).send({ error: user });
      }
      if (user === "Phone already exists") {
        return res.status(409).send({ error: user });
      }
      res.send({ message: "User updated successful", user });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  receiveOrders: async (req, res) => {
    try {
      const orders = await userServices.receiveOrders();
      res.send(orders);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  completeOrder: async (req, res) => {
    try {
      const order = await userServices.completeOrder(req.params.id);
      res.send(order);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  completeOrderList: async (req, res) => {
    try {
      console.log(req.params.id);
      const orders = await userServices.completeOrderList(req.params.id);
      res.send(orders);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};

module.exports = userController;
