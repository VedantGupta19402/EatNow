const express=require("express");
const app=express();
const cookieparser=require("cookie-parser");
const bcrypt=require("bcryptjs")
const authroutes=require("../src/routes/auth.routes")
const foodroutes=require("../src/routes/food.routes")
app.use(cookieparser())
app.use(express.json())
app.use("/api/auth",authroutes)
app.use("/api/food",foodroutes)
module.exports=app;   