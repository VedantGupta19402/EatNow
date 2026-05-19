const mongoose=require ("mongoose")
const foodmodelSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    foodpartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodpartner"
    },
    price:{
        type:Number,
        required:true
    },
    ratings:{
        type:Number,
        required:true
    },
    
})