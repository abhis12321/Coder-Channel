import mongoose from "mongoose";
import dbConnect from "./dbConnect";

dbConnect();
const followerSchema = new mongoose.Schema({
    followedById:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true , 'Please enter follower-id'],
        ref:"Users",
    },
    followedToId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true , "Please enter the user-id"],
        ref:"Users",
    },
});


export default mongoose.models.Follower || mongoose.model("Follower" , followerSchema);