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
})
export const login = mongoose.models.Emails || mongoose.model("Emails" , model3);  // constructor
