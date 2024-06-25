const Sirv = require("../functions/Sirv");
const User = require("../databse/user");
const Plate = require("../databse/plate");
const utilities = require("../functions/utils");

const signupProcess = async ({ name, email, password, role, permission }) => {
  if (!name || !email || !password || !role) {
    return "All fields are required!";
  }
  if (await User.findOne({ where: { email } })) {
    console.error("Email already Taken");
    return "Account Already Exist";
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters!");
    return "Password must be at least 8 characters!";
  }
  if (role !== "admin" && role !== "user") {
    console.error("Role does not exist!");
    return "Role does not exist!";
  }
  // if (permission.length === 0 || !permission) {
  //   console.error("Permission is required!");
  //   return "Permission is required!";
  // }
  return null;
};

const replaceImage = async (plateName, Image) => {
  if (!Image) {
    return "No image to replace with";
  }
  const plate = await Plate.findOne({ where: { PlateName: plateName } });
  const oldImage = plate.Image;
  // const resizedAvatar = await resizeAndCompressImage(avatar.buffer, 100); // Resize to maximum dimensions of 200x200 with 60% quality
  const newImage = await Sirv.replaceImage(oldImage, Image.buffer); // Replace the old avatar with the new one
  // const newAvatar = await Sirv.replaceImage(oldAvatar, avatar.buffer);
  plate.Image = newImage;
  await plate.save();
  return;
};

const adminServices = {
  addMember: async ({ name, email, password, role }) => {
    const validationError = await signupProcess({
      name,
      email,
      password,
      role,
      // permission,
    });
    if (validationError) {
      return validationError;
      // throw new Error(validationError);
    }
    password = await utilities.hashPassword(password);
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    if (!user) {
      return "Failed to create user!";
    }
    // await user.setPermissions(permission);
    // mailer.handleSignup(user.email)
    returnData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return returnData;
  },

  // Function to upload News
  addPlate: async (payload) => {
    if (
      !payload.PlateName ||
      !payload.Category ||
      !payload.Price ||
      !payload.Image
      // payload.image.length === 0
    ) {
      return "All fields are required!";
    }
    if (payload.Price < 0) {
      return "Price must be greater than 0";
    }
    const existingPlate = await Plate.findOne({
      where: { PlateName: payload.PlateName },
    });
    if (existingPlate) {
      return "Plate already exist!";
    }
    const image = await Sirv.uploadImage(payload.Image);
    if (!image) {
      return "No image uploaded.";
    }
    payload.Image = image;
    const plate = await Plate.create(payload);
    return plate;
  },

  updatePlate: async (plateId, payload) => {
    if (!plateId) {
      return "Plate Name is required!";
    }
    const plate = await Plate.findOne({ where: { id: plateId } });
    if (!plate) {
      return "Plate not found";
    }

    const allowedUpdates = [
      "Category",
      "Price",
      "Discount",
      "Description",
      "Image",
    ];
    const updatesKeys = Object.keys(payload).filter(
      (update) => update !== "PlateName"
    );

    const dataToUpdate = updatesKeys.filter(
      (update) => payload[update] !== undefined
    );
    if (dataToUpdate.length === 0) {
      return "No updates provided!";
    }

    const isValidOperation = dataToUpdate.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return "Invalid updates!";
    }

    for (const update of dataToUpdate) {
      if (update === "Price" && payload.Price < 0) {
        return "Price must be greater than 0";
      }
      if (update === "Image") {
        if (plate.Image) {
          console.log("Replacing image")
          await replaceImage(plateName, payload.Image);
        } else {
          const image = await Sirv.uploadImage(payload.Image.buffer);
          if (!image) {
            return "No image uploaded.";
          } else {
            console.log(image);
            plate.Image = image; // Assuming Sirv.uploadImage returns the image URL directly
          }
        }
      } else {
        plate[update] = payload[update];
      }
    }

    await plate.save();
    return plate;
  },

  getAllMembers: async () => {
    const members = await User.findAll({ where: { role: "user" } });
    return members;
  },
  deletePlate: async (id) => {
    const plate = await Plate.findOne({ where: { id: id } });
    if (!plate) {
      return "Plate not found";
    }
    await plate.destroy();
    return "Plate deleted successfully";
  },
  // Function to update Plate
  // updatePlate: async (plateName,payload) => {
  //   if (!plateName) {
  //     return "Plate Name is required!";
  //   }
  //   const plate = await Plate.findOne({ where: { PlateName: plateName } });
  //   if (!plate) {
  //     return "Plate not found";
  //   }
  //   allowedUpdates = ["Category", "Price", "Discount", "Description", "Image"];
  //   updatesKeys = Object.keys(payload);
  //   updatesKeys.forEach(async (update) => {
  //     if (update === "PlateName") {
  //       updatesKeys.splice(updatesKeys.indexOf(update), 1);
  //     }
  //   });
  //   // console.log(allowedUpdates)
  //   console.log(updatesKeys)
  //   const dataToUpdate = updatesKeys.filter((update) => {
  //     if (payload[update] === undefined) {
  //       return false;
  //     }
  //     return true;
  //   });
  //   console.log(dataToUpdate)
  //   if (dataToUpdate.length === 0) {
  //     return "No updates provided!";
  //   }
  //   const isValidOperation = dataToUpdate.every((update) =>
  //     allowedUpdates.includes(update)
  //   );
  //   if (!isValidOperation) {
  //     return "Invalid updates!";
  //   }
  //   await dataToUpdate.forEach(async (update) => {
  //     if (update === "Price" && payload.Price < 0) {
  //       return "Price must be greater than 0";
  //     }
  //     if (update === "Image") {

  //       const image = await Sirv.uploadImage(payload.Image);
  //       if (!image) {
  //         return "No image uploaded.";
  //       }
  //       else {
  //         console.log(image)
  //         plate.Image = await image;
  //       }
  //     }
  //     plate[update] = await payload[update];
  //   }
  //   );
  //   await plate.save();
  //   return plate;
  // },
  // Function to delete Member
  deleteMember: async (id) => {
    // const user = await User.findOne({ where: { email } });
    // if (!user) {
    //   return "User not found";
    // }
    const user = await User.findOne({ where: { id:id } });
    await user.destroy();
    return "User deleted successfully";
  },
};

module.exports = adminServices;
