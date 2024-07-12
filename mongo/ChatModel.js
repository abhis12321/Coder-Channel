import mongoose from "mongoose";
import dbConnect from './dbConnect'

dbConnect();
const chatSchema = new mongoose.Schema({
    senderId:{
        type:String,
        required:[true , "sender-id is missing."],
    },
    senderName:{
        type:String,
        required:[true , "sender-name is missing."],
    },
    receiverId:{
        type:String,
        required:[true , "sender-id is missing."],
    },
    receiverName:{
        type:String,
        required:[true , "sender-name is missing."],
    },    
    message:{
        type:String,
        required:[true , "chat-message is missing."],
    },
    
});


export const Chat = mongoose.models.Chat || mongoose.model("Chat" , chatSchema);