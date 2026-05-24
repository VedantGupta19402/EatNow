const foodModel = require("../models/food.model.js");
const imagekit=require("../utility/imageKit");
const {v4:uuid}=require("uuid");
async function createfood(req, res) {
  console.log(req.foodpartner)
  const fileUploadResult=await imagekit.uploadFile(req.file.buffer,uuid());
  const foodItem=await foodModel.create({
	name:req.body.name,
	video:fileUploadResult,
	description:req.body.description,
	foodpartner:req.foodpartner._id,
  })
  res.status(201).json({
    message:"food item created",
    food:foodItem
  })
}

module.exports={createfood}  
