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
    },
address:{
type:String,
required:true,
},
phone:{
type:String,
required:true,
},
restaurantName:{
type:String,
required:true,
}, 
},
   {
    timestamps:true
},
)
const foodpartnerModel=mongoose.model("foodpartnerSchema",foodpartnerSchema)
module.exports=foodpartnerModel