const bcrypt = require("bcryptjs");
const utilities = require("../functions/utils");
const Sirv = require("../functions/Sirv");
const Order = require("../databse/order");
const OrderItem = require("../databse/OrderItem");
const Plate = require("../databse/plate");


const User = require('../databse/user');

const loginProcess = async ({ email, password }) => {
  if (!email || !password) {
    return "Email and password are required!";
  }
  return null;
};

const userServices = {
  loginUser: async (email, password) => {
    const validationError = await loginProcess({ email, password });
    if (validationError) {
      return validationError;
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid Email or Password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Email or Password");
    }
    // const permissions = await user.getPermissions();
    // const plainPermissions = permissions.map(
    //   (permission) => permission.get({ plain: true }).id
    // );
    const token = await utilities.generateToken(user);
    user.tokens = user.tokens || [];
    user.tokens = user.tokens.concat(token);
    await user.save();
    const returnData = {
      id: user.id,
      name: user.name,
      email: user.email,
      // verified: user.verified,
      role: user.role,
      tokens: user.tokens,
    };
    return { user: returnData, token };
  },
  verifyUser: async (email, verifyCode) => {
    const result = await mailer.handleVerification(email, verifyCode);
    if (result === false) {
      throw new Error("Invalid Verification Code");
    }
    user.verified = true;
    await user.save();
    return user;
  },
  logoutUser: async (user, token) => {
    console.log(user.tokens);
    const userToken = [];
    user.tokens.forEach((t) => {
      if (t !== token) {
        userToken.push(t);
      }
    });
    user.tokens = userToken;
    console.log(user.tokens);
    await user.save();
    return user;
  },
  logoutAllUsers: async (user) => {
    user.tokens = [];
    await user.save();
    return user;
  },
  updateUser: async (user, payload) => {
    const updates = Object.keys(payload);
    const allowedUpdates = ["name", "password", "phone"];
    const isValidOperation = updates.every((update) => {
      return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
      return "Invalid updates!";
    }
    if (updates.includes("phone")) {
      const existingUser = await User.findOne({ where: { phone: payload.phone } });
      if (existingUser && existingUser.email !== user.email) {
        return "Phone already exists";
      }
    }

    updates.forEach(async (update) => {
      if (update === "password") {
        user.password = await utilities.hashPassword(payload[update]);
        await user.save();
      } else {
        user[update] = payload[update];
      }
    });
    await user.save();
    return user;
  },
  receiveOrders: async () => {
    const orders = await Order.findAll({ where: { status: "pending" }});
    const orderItems = await OrderItem.findAll({ where: { orderId: orders.map((order) => order.orderId) }});
    
    const plateIds = orderItems.map((item) => item.PlateId);
    const plates = await Plate.findAll({ where: { id: plateIds }});
    const plateMap = {};
    plates.forEach((plate) => {
      plateMap[plate.id] = plate;
    });
    orderItems.forEach((item) => {
      item.dataValues.plate = plateMap[item.PlateId];
    });
    orders.forEach((order) => {
      order.dataValues.items = orderItems.filter((item) => item.orderId === order.orderId);
    });
    return orders;
  },
  completeOrder: async (id, payload) => {
    try {
        const order = await Order.findOne({ where: { orderId: id }});
        if (!order) {
            throw new Error('Order not found');
        }
        order.status = payload.status;
        await order.save();
        return order;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
},
};  

module.exports = userServices;
