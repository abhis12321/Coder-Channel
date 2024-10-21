import mongoose from "mongoose";
import dbConnect from "./dbConnect";

dbConnect();
const userSchema = new mongoose.Schema({    //data model
    name:{
        type:String,
        required:[true , 'Please enter user name'],
    },
    email:{
        type:String,
        unique:[true , "This email is already registered!"],
        required:[true , "Please enter your email"]
    },
    password:{
        type:String,
        required:[true , 'Please enter your password'],
    },
    gender:{
        type:String,
        required:[true , "Please enter your gender"],
        enum: {
            values:[
                "male",
                "female",
                "others"
            ],
            message:"Please select correct gender",
        }
    },
    university:{
        type:String,
    },
    course:{
        type:String,
    },
    verify:{
        type:Boolean,
        default:false,
    },
    isOnline:{
        type:Number,
        default:0,
    },
    imgUrl:{
        type:String,
        default:"/img/profileImg.jpg", 
    },
    linkedIn: {
        type:String,
    },
    instagram: {
        type:String,
    },
    github: {
        type:String,
    },
    createdAt: {
        type:Date,
        default:Date.now,
    }
});


export default mongoose.models.Users || mongoose.model("Users" , userSchema);  // constructor
