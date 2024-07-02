const Plate = require("../databse/plate");
const Order_items = require("../databse/OrderItem");
const Order = require("../databse/order");

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
  getAllPlates: async (payload) => {
    const plates = await Plate.findAll();
    return plates;
  },
  addToCart: async (payload) => {
    var plates = [];
    const order = await Order.create({
      tableId: payload.tableId,
      status: "pending",
    });

    payload.cart.forEach(async element => {
      const plate = await element.plate;
      await Order_items.create({
        quantity: element.Quantity,
        PlateId: plate.id,
        orderId: order.orderId,
      });
    });
    
    return "Plate added to cart!";

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
