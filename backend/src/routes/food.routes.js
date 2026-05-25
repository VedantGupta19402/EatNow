const express = require("express");
const router = express.Router();
const foodcontroller = require("../controllers/food.controller");
const authmiddleware = require("../middleware/auth.middleware");
const multer=require("../utility/multer");
//ye api protected honachaiye isliye middleware ko rkha he ju check krega token usme
router.post("/", authmiddleware.authfoodpartnermiddleware,multer.single("video"), foodcontroller.createfood);
//or isse middleware se ek or cheezho rhi wuye hi ki ab apan foodpartner ko vreate food function me acces kr pyenge or protected bn hi gyi
router.get("/",authmiddleware.authusermiddleware,foodcontroller.getfoodItems);
module.exports=router 