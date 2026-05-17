const mongoose=require("mongoose");
const foodpartnerSchema=new mongoose.Schema({
    fullname:{
       type:String,
       required:true,
    },
    email:{
     type:String,
required:true,
unique:true
    },
    password:{
type:String,
minlength:6,
    }},
   {
    timestamps:true
},
)
const foodpartnerModel=mongoose.model("foodpartnerSchema",foodpartnerSchema)
module.exports=foodpartnerModel