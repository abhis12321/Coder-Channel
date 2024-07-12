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