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
    time:{
        type:Date,
        default:Date.now,
    }
})

export default mongoose.models.Blog || mongoose.model("Blog" , blogSchema);