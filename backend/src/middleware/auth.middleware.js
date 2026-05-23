const foodpartnerModel=require("../models/foodPartner.model.js")
const jwt =require("jsonwebtoken")
async function authfoodpartnermiddleware(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"unauthorized:no token found"
        })
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const foodpartner=await foodpartnerModel.findById(decoded.id)
        req.foodpartner=foodpartner
        next()
    } 
    catch (error) {
       console.log(error) 
    }
}
module.exports={
    authfoodpartnermiddleware,
    
}