const bcrypt = require("bcryptjs");
const utilities = require("../functions/utils");
const Sirv = require("../functions/Sirv");

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
};  

module.exports = userServices;
