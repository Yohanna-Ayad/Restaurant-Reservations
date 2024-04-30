const customerService = require("../services/customer");

const customerController = {
  // Function to get all plates from the database
  getPlates: async (req, res) => {
    try {
      const result = await customerService.getPlates(req.body);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
    // Function to add plate to cart
    addToCart: async (req, res) => {
      try {
        const result = await customerService.addToCart(req.body);
        if (result === "Plate not found!") {
          return res.status(404).send({
            error: result,
          });
        }
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    },
};

module.exports = customerController;
