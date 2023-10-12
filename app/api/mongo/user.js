import mongoose from "mongoose";
const model1 = new mongoose.Schema({
    name:String,
    title:String,
    age:Number,

});
export const user = mongoose.models.next1 || mongoose.model('next1' , model1);