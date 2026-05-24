const mongoose = require("mongoose");

const foodmodelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    foodpartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodpartnerSchema",
    },  
    
  },
  {timestamps: true}
);

const foodModel = mongoose.model("FoodModel", foodmodelSchema);

module.exports = foodModel;
