const userModel = require("../../src/models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const foodpartnerModel = require("../models/foodPartner.model.js");
//register user
async function registerUser(req, res) {
  const { fullname, email, password } = req.body;
  const isuserAlreadyexits = await userModel.findOne({ email });
  if (isuserAlreadyexits) {
    return res.status(400).json({
      message: "user already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    fullname,
    email,
    password: hashedPassword,
  });
  //register token
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("userToken", token);
  res.status(201).json({
    message: "user registered succesfully",
    user: {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
    },
  });
}
//login user
async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "Invaild user or password",
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "invaild user or password",
    });
  }
  //login token
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("userToken", token);
  res.status(201).json({
    message: "user logged in succesfully",
    user: {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
    },
  });
}
//logout user
function logoutUser(req, res) {
  res.clearCookie("userToken");
  res.clearCookie("token");
  res.status(200).json({
    message: "user logged out successfully",
  });
}
//FOOD PARTNER
async function foodpartnerregister(req, res) {
  const { fullname, email, password } = req.body;
  const isfoodpartnerAlreadyexits = await foodpartnerModel.findOne({email});
  if (isfoodpartnerAlreadyexits) {
    return res.status(201).json({
      messsage: "foodpartner already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const foodpartner = await foodpartnerModel.create({
    fullname,
    email,
    password: hashedPassword,
  });
  //food partner register token
  const token = jwt.sign(
    {
      id: foodpartner._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("foodpartnerToken", token);
  res.status(201).json({
    message: "food partner registered  succesfully",
    foodpartner: {
      id: foodpartner._id,
      email: foodpartner.email,
      fullname: foodpartner.fullname,
    },
  });
}
//FOOD PARTNER LOGIN
async function foodpartnerlogin(req,res) {
    const{fullname,email,password}=req.body 
    const foodpartner=await foodpartnerModel.findOne({email})
    if(!foodpartner){
        return res.status(201).json({
            message:"invaild id or password"
        })}
        const isPasswordMatch=bcrypt.compare(password,foodpartner.password)
        if(!isPasswordMatch){
            return res.status(201).json({
                message:"invaild id or password"
            })
        }
 //foodpartner login token
        const token=jwt.sign(
            {
id:foodpartner._id
        },process.env.JWT_SECRET)
        res.cookie("foodpartnerToken",token)
        res.status(201).json({
            message: "food partner logged in succesfully",  
            foodpartner: {
              id: foodpartner._id,
              email: foodpartner.email,
              fullname:foodpartner.fullname,
            },
          });
}
//logout foodpartner
function logoutfoodpartner(req,res){
    res.clearCookie("foodpartnerToken")
    res.clearCookie("token")
    res.status(200).json({
        message: "food partner logged out successfully",
    });
}
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  foodpartnerregister,
  foodpartnerlogin,
  logoutfoodpartner,
};
