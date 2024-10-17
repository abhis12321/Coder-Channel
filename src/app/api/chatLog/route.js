import { NextResponse } from "next/server";
import { Chat } from '/mongo/ChatModel'
import { authenticateUser } from '../../../authenticateUser'

export async function GET() {
    return NextResponse.json({success:true});
}

export async function POST(request) {
    try {
        let data = await request.json();
        const isVerified = authenticateUser(data.senderId);
        
        if(!isVerified) {
            return NextResponse.json({} , { status:404})
        }
        let chat = new Chat(data);
        await chat.save();
        // console.log(data , chat);
        return NextResponse.json({success:true , message:"chat is saved"});
    } catch(error) {
        console.log(error.message)
        return NextResponse.json({success:false , message:error.message});
    }
}

export async function PUT(request) {
    try {
        let {user1 , user2} = await request.json();
        const isVerified = authenticateUser(user1);
        
        if(!isVerified) {
            return NextResponse.json({} , { status:404})
        }

        let chats = await Chat.find({
            $or:[
                {senderId: user1 , receiverId: user2},
                {senderId: user2 , receiverId: user1}
            ]
        })
        .populate({
            path: 'senderId',  // Use the correct field name as per schema
            model: 'Users',       // Explicitly mention the 'Users' model
            select: 'name' // Select name and imgUrl fields
        })
        .populate({
            path: 'receiverId',  // Use the correct field name as per schema
            model: 'Users',       // Explicitly mention the 'Users' model
            select: 'name' // Select name and imgUrl fields
        })
        .exec();
        return NextResponse.json({success:true , chats});
    } catch(error) {
        return NextResponse.json({success:false , message:error.message});
    }
}