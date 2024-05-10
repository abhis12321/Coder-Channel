import { NextResponse } from "next/server";
import Users from '/mongo/UserModel';


export async function GET() {
    let data = await Users.find();
    return NextResponse.json({data , success:true});
}


export async function POST(req) {
    let res =  await req.json();
    let data = await Users.insertMany([res]);    
    return NextResponse.json({data , success:true});
}


export async function PUT(req , {params}) {
    return NextResponse.json({success:true});
}