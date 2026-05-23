const express=require("express");
const router=express.Router();
const authcontroller=require("../controllers/controllers.js")
router.post('/user/register',authcontroller.registerUser)
router.post('/user/login',authcontroller.loginUser)
router.get('/user/logout',authcontroller.logoutUser)

//food partner routes
router.post('/foodpartner/register',authcontroller.foodpartnerregister)
router.post('/foodpartner/login',authcontroller.foodpartnerlogin)
router.get('/foodpartner/logout',authcontroller.logoutfoodpartner)
module.exports=router;  