import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {mongoUrl , students} from '/mongo/exp'

export async function GET(req) {
    // let data = await req.json();
    // console.log(data);
    await mongoose.connect(mongoUrl);
    let found = await students.find();
    // let found = await students.find({name:"abhishek singh"});
    return NextResponse.json({found , success:true});
}

export async function POST(req) {
    try {
        let data = await req.json();
        await mongoose.connect(mongoUrl);
        let check = await students.find({email:data.email});
        console.log(check);
        if(check.length == 0) {
            // {let students = new students(data);
            // let saved = await students.save();
            // console.log(saved);}

            let saved = await students.insertMany([data]);      // works same as the above code
            return NextResponse.json({saved , success:true});
        }
        else {
            return NextResponse.json({sucess:false});
        }
    }
    catch(err) {
        return NextResponse.json({sucess:false});
    }
}