import { NextResponse } from "next/server";
import { Chat } from '/mongo/ChatModel'

export async function GET() {
    return NextResponse.json({success:true});
}

export async function POST(request) {
    try {
        let data = await request.json();
        let chat = new Chat(data);
        await chat.save();
        // console.log(data , chat);
        return NextResponse.json({success:true , message:"chat is saved"});
    } catch(error) {
        return NextResponse.json({success:false , message:error.message});
    }
}

export async function PUT(request) {
    try {
        let {user1 , user2} = await request.json();
        let chats = await Chat.find({
            $or:[
                {senderId:user1 , receiverId:user2},
                {senderId:user2 , receiverId:user1}
            ]
        })
        console.log(user1, user2);
        return NextResponse.json({success:true , chats});
    } catch(error) {
        return NextResponse.json({success:false , message:error.message});
    }
}