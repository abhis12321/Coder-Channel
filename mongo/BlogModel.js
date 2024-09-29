import mongoose from "mongoose";
import dbConnect from "./dbConnect";

dbConnect();
const blogSchema = new mongoose.Schema({
    writerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true , "Writer id is missing"],
        ref:"Users",
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
    time:{
        type:Date,
        default:Date.now,
    }
})

export default mongoose.models.Blogs || mongoose.model("Blogs" , blogSchema);