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
        required:[true , 'Please enter the University name'],
    },
    course:{
        type:String,
        required:[true , 'Please enter the course name'],
    },
    verify:{
        type:Boolean,
        default:false,
    },
    isOnline:{
        type:Boolean,
        default:false,
    },
    imgUrl:{
        type:String,
        default:"/img/profileImg.jpg" 
    },
    linkedIn: {
        type:String,
        default:'/students'
    },
    instagram: {
        type:String,
        default:'/students'
    },
    github: {
        type:String,
        default:'/students'
    },
    likes:{
        type:Number,
        default:0,
    },
    followers: {
        type:Number,
        default:0,
    },
    followings: {
        type:Number,
        default:0,
    },
});


export default mongoose.models.Users || mongoose.model("Users" , userSchema);  // constructor
