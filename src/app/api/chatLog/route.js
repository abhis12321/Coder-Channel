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
        let {tempUserId , mainUserId} = await request.json();
        const isVerified = authenticateUser(mainUserId);
        

        console.log("PUTTIng----" , tempUserId)
        if(!isVerified) {
            return NextResponse.json({ } , { status:404})
        }
        let chats = await Chat.find({
                            $or:[
                                {senderId: mainUserId , receiverId: tempUserId},
                                {senderId: tempUserId , receiverId: mainUserId}
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
        console.log("ERROR->" , error.message);
        return NextResponse.json({success:false , message:error.message});
    }
}