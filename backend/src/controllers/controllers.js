const userModel=require("../../src/models/user.model.js")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
async function registerUser(req,res){
    const{fullname,email,password}=req.body
    const isuserAlreadyexits=await userModel.findOne({email})
    if(isuserAlreadyexits){
        return res.status(400).json({
            message:"user already exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await userModel.create({
        fullname,email,password:hashedPassword
    })
    const token=jwt.sign({
        id:user._id
    },"bbcb741f5efcc32dcac7db680f68235775600a55")
    res.cookie(token,"token")
    res.status(201).json({
        message:"user registered succesfully",
        user:{
 id:user._id,
email:user.email,
fullname:user.fullname
        }
    })
}
module.exports={
    registerUser
}
