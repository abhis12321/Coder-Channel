import mongoose from "mongoose";
import dbConnect from "./dbConnect";

dbConnect();
const blogSchema = new mongoose.Schema({
    writer:{
        type:String,
        required:[true , "Blog writer name is missing!"],
    },
    writerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true , "Writer id is missing"],
    },
    blog:{
        type:String,
        required:[true , "There is no blog found!"],
    },
    image:{
        type:String,
    },
    likes: {
        type:Number,
        default:0,
    },
    dislikes: {
        type:Number,
        default:0,
    },
    time:{
        type:Date,
        default:Date.now,
    }
})

export default mongoose.models.Blog || mongoose.model("Blog" , blogSchema);