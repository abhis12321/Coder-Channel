import { NextResponse } from "next/server";
import {mongoUrl , Student} from '/mongo/exp';
import mongoose from "mongoose";

export async function PUT(req , {params}) {
    let data = await req.json();
    await mongoose.connect(mongoUrl);
    let new_data = await Student.findOneAndUpdate({_id:params.id} , {data});
    return NextResponse.json({new_data , success:true});
}