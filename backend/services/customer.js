const Plate = require("../databse/plate");

const customerService = {
  getPlates: async (payload) => {
    const limit = payload.limit || 10;
    const offset = payload.offset || 0;
    const plates = await Plate.findAll ({
      limit,
      offset,
    });
    return plates;
  },
    addToCart: async (payload) => {
        const plate = await Plate.findOne({ where: { PlateName: payload.PlateName } });
        if (!plate) {
        return "Plate not found!";
        }
        return plate;
    },
};

module.exports = customerService;
