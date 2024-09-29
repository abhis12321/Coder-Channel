import mongoose from "mongoose";
import dbConnect from './dbConnect'

dbConnect();
const chatSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true , "sender-id is missing."],
        ref:"Users",
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true , "sender-id is missing."],
        ref:"Users",
    },  
    message:{
        type:String,
        required:[true , "chat-message is missing."],
    },
    
});


export const Chat = mongoose.models.Chats || mongoose.model("Chats" , chatSchema);