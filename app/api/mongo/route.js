import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {mongoUrl , login} from '/mongo/exp';


export async function GET(req) {
    await mongoose.connect(mongoUrl);
    let data = await login.find();
    
    return NextResponse.json({data , success:true});
}


export async function POST(req) {
    let res =  await req.json();
    await mongoose.connect(mongoUrl);
    let data = await login.insertMany([res]);
    
    return NextResponse.json({data , success:true});
}


export async function PUT(req , {params}) {
    return NextResponse.json({success:true});
}