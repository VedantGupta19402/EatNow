const userModel=require("../../src/models/user.model.js")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
//register
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
    //register token
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)
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
//login
async function loginUser(req,res){
const {email,password}=req.body
const user=await userModel.findOne({ email})
if(!user){
    return res.status(401).json({
        message:"Invaild user or password"
    })
}
const isPasswordMatch=bcrypt.compare(password,user.password)
if(!isPasswordMatch){
    return res.status(401).json({
        message:"invaild user or password"
    })
}
//login token
const token=jwt.sign({
    id:user._id
},process.env.JWT_SECRET)
res.cookie(token,"token")
res.status(201).json({
    message:"user logged in succesfully",
    user:{
 id:user._id,
email:user.email,
fullname:user.fullname
    }
})
}
module.exports={
    registerUser,loginUser
}
