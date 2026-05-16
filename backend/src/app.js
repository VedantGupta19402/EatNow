const express=require("express");
const app=express();
const cookieparser=require("cookie-parser");
const bcrypt=require("bcryptjs")
const authroutes=require("../src/routes/auth.routes")
app.use(cookieparser())
app.use(express.json())
app.use("/api/routes",authroutes)
module.exports=app;