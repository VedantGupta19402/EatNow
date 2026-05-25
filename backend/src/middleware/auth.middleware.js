const foodpartnerModel=require("../models/foodPartner.model.js")
const foodModel=require("../models/food.model.js")
const jwt =require("jsonwebtoken");
const userModel = require("../models/user.model.js");
async function authfoodpartnermiddleware(req,res,next){
    const token=req.cookies.foodpartnerToken;
    if(!token){
        return res.status(401).json({
            message:"unauthorized:no token found"
        })
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const foodpartner=await foodpartnerModel.findById(decoded.id)
        req.foodpartner=foodpartner 
        if(!foodpartner){
            return res.status(401).json({
                message:"unauthorized:invalid token"
            })
        }  
        next()
    } 
    catch (error) {
       console.log(error) 
    }
}
async function authusermiddleware(req,res,next){
   const token=req.cookies.userToken
   if(!token){
    return res.status(401).json({
        message:"please login first"
    })
   }
   try {
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    const user= await userModel.findById(decode.id)
    req.user=user 
    if(!user){
        return res.status(401).json({
            message:"unauthorized:invalid token"
        })
    }
    next()
   } catch (error) {
    console.log(error)
   }

}
module.exports={
    authfoodpartnermiddleware,
    authusermiddleware,
}
