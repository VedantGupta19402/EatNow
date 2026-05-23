const foodmodels = require("../models/food.model");

async function createfood(req, res) {
  console.log("createfood hit");
  console.log("body:", req.body);
  res.json({
    message: "foodcreated",
  });
}
module.exports = { createfood };
    