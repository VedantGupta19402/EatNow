const express=require("express");
const app=express();
const cookieparser=require("cookie-parser");
const bcrypt=require("bcryptjs")
const cors=require("cors")
const authroutes=require("../src/routes/auth.routes")
const foodroutes=require("../src/routes/food.routes")
app.use(cookieparser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))
app.use("/api/auth/",authroutes)
app.use("/api/food",foodroutes)
module.exports=app;   