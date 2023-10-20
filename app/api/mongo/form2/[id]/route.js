import { NextResponse } from "next/server";
import {mongoUrl , login} from '/mongo/exp';
import mongoose from "mongoose";

export async function GET(req , {params}) {
    let data;
    try {
        await mongoose.connect(mongoUrl);
        data = await login.findOne({_id:params.id})
        // console.log(data);
    }
    catch(err) {
        // console.log(err);
        data = {name:"unknown"}
    }
    
    return NextResponse.json({data , success:true});
}

export async function PUT(req , {params}) {
    try {
        let data = await req.json();
        await mongoose.connect(mongoUrl);
        let new_data = await login.findOneAndUpdate({_id:params.id} , {$set: {...data}});
        return NextResponse.json({new_data , success:true});
    }
    catch(err) {
        return NextResponse.json({success:false});
    }
}


export async function DELETE(req , {params}) {
    try {
        await mongoose.connect(mongoUrl);
        await login.deleteOne({_id:params.id});
        return NextResponse.json({success:true});
    }
    catch(err) {
        return NextResponse.json({success:false});
    }
}