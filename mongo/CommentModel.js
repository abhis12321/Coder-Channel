import mongoose from "mongoose";
import dbConnect from "./dbConnect";

dbConnect();
const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    commentToId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Blogs",
    },
    commentById:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Users",
    },
    commentedAt: {
        type:Date,
        default:Date.now,
    }
})



export const Comment = mongoose.models.Comments || mongoose.model("Comments" , commentSchema);