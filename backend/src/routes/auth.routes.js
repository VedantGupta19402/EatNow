const express=require("express");
const router=express.Router();
const authcontroller=require("../controllers/controllers")
router.post('/user/register',authcontroller.registerUser)
router.post('/user/login',authcontroller.loginUser)
module.exports=router;