const foodModel = require("../models/food.model.js");
const imagekit = require("../utility/imageKit");
const { v4: uuid } = require("uuid");
async function createfood(req, res) {
  const fileUploadResult = await imagekit.uploadFile(req.file.buffer, uuid());
  console.log(fileUploadResult);
  const foodItem = await foodModel.create({
    name: req.body.name,
    video: fileUploadResult,
    description: req.body.description,
    foodpartner: req.foodpartner._id,
  });
  res.status(201).json({
    message: "food item created",
    food: foodItem,
  });
}
async function getfoodItems(req,res) {
   const foodItem=await foodModel.find().populate("foodpartner")
   if(!foodItem){
    return res.status(404).json({
        message:"food item not found"
    })
   }
   res.status(200).json({
    message:"food item found",
    food:foodItem
   })
}
module.exports = {
   createfood,
   getfoodItems 
  };
