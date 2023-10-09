import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {next2 , mongoUrl} from '/mongo/exp'


export async function GET(req) {
    await mongoose.connect(mongoUrl)
    let data = await next2.find();
    
    return NextResponse.json({data , success:true});
}


export async function POST(req) {
    let res =  await req.json();
    await mongoose.connect(mongoUrl);
    
    // let datum = new next2(res)
    // let data = await datum.save();      //save the data to mongodb
    
    let data = await next2.insertMany(res);
    return NextResponse.json({data , success:true});
}