import mongoose from "mongoose";

const model3 = new mongoose.Schema({    //data model
    email:String,
    name:String,
    age:Number,
    gender:String,
    address:String,
    city:String,
    state:String,
    pin_code:Number,
    university:String,
    course:String,
    branch:String,
    semester:Number,
    verify:Boolean,
    password:String,
    url:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT44xyPyV2KNaYbm0oO-E5sn0NyanhpjfjI7pd6ozdrRTJRl9Y5ixHj5dIQsAso7d9A1ms&usqp=CAU",
    }
})
const Insta = new mongoose.Schema({    //data model
    email:String,
    name:String,
    age:Number,
    gender:String,
    country:String,
    verify:Boolean,
    password:String,
    posts:[String],
    profile:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT44xyPyV2KNaYbm0oO-E5sn0NyanhpjfjI7pd6ozdrRTJRl9Y5ixHj5dIQsAso7d9A1ms&usqp=CAU",
    }
})
 
export const login = mongoose.models.Emails || mongoose.model("Emails" , model3);  // constructor
// export const insta = mongoose.models.mySocialMedias || mongoose.model("mySocialMedia" , Insta);  // constructor