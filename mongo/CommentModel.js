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
    },
    commentById:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
})



export const Comments = mongoose.models.Comment || mongoose.model("Comment" , commentSchema);