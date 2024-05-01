const Plate = require("../databse/plate");

const customerService = {
  getPlates: async (payload) => {
    const limit = payload.limit || 10;
    const offset = payload.offset || 0;
    const plates = await Plate.findAll({
      limit,
      offset,
    });
    return plates;
  },
  addToCart: async (payload) => {
    const plate = await Plate.findOne({
      where: { PlateName: payload.PlateName },
    });
    if (!plate) {
      return "Plate not found!";
    }
    return plate;
  },
  getCategories: async () => {
    const categories = await Plate.findAll({
      attributes: ["Category"],
      group: ["Category"],
    });
    const result = categories.map((category) => category.Category);
    return result;
  },
  getPlatesByCategory: async (payload) => {
    const category = payload.Category;
    const limit = payload.limit || 10;
    const offset = payload.offset || 0;
    const plates = await Plate.findAll({
      where: { Category: category },
      limit,
      offset,
    });
    if (plates.length === 0) {
      return "No plates found!";
    }
    return plates;
  },
};

module.exports = customerService;
