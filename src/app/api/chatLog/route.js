import { Chat } from '/mongo/ChatModel';
import { NextResponse } from "next/server";
import { getJWTUser } from '@/utilities/getJWTUser';
import { authenticateUser } from '@/utilities/authenticateUser';

export async function GET() {
    try {
        const { _id = null } = getJWTUser();
        if (!_id) {
            return NextResponse.json({}, { status: 404 })
        }
        // Find all messages where the receiverId matches _id
        const messages = await Chat.find({ $or : [{ receiverId: _id } , {  senderId: _id }] })
            .select("senderId receiverId")
            .sort({ time: -1 })
            .populate({
                path: 'senderId',   // targeting through
                model: 'Users',       // targeting to
                select: 'name imgUrl university' // field to select
            })
            .populate({
                path: 'receiverId',   // targeting through
                model: 'Users',       // targeting to
                select: 'name imgUrl university' // field to select
            })
            .lean() //  Mongoose documents => js objects
            .exec();

        const senders = [];
        const uniqueSenderIds = new Set();
        messages.map(message => {
            let sender_Id = String(message.senderId?._id);
            let receiver_Id = String(message.receiverId?._id);
            if(sender_Id != _id) {
                if(!uniqueSenderIds.has(sender_Id)) {
                    uniqueSenderIds.add(sender_Id);
                    senders.push(message.senderId);
                }
            } else {
                if(!uniqueSenderIds.has(receiver_Id)) {
                    uniqueSenderIds.add(receiver_Id);
                    senders.push(message.receiverId);
                }
            }
        });

        
        return NextResponse.json({ senders })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({}, { status: 404 })
    }
}

export async function POST(request) {
    try {
        let data = await request.json();
        const isVerified = authenticateUser(data.senderId);

        if (!isVerified) {
            return NextResponse.json({}, { status: 404 })
        }
        let chat = new Chat(data);
        await chat.save();
        return NextResponse.json({ success: true, message: "chat is saved" });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

export async function PUT(request) {
    try {
        let { tempUserId, mainUserId } = await request.json();
        const isVerified = authenticateUser(mainUserId);

        if (!isVerified) {
            return NextResponse.json({}, { status: 404 })
        }
        let chats = await Chat.find({
            $or: [
                { senderId: mainUserId, receiverId: tempUserId },
                { senderId: tempUserId, receiverId: mainUserId }
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
        return NextResponse.json({ success: true, chats });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
