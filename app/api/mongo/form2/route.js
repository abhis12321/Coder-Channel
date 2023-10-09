import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {mongoUrl , Student} from '/mongo/exp'

export async function GET(req) {
    // let data = await req.json();
    // console.log(data);
    await mongoose.connect(mongoUrl);
    let found = await Student.find();
    // let found = await Student.find({name:"abhishek singh"});
    return NextResponse.json({found , Success:true});
}

export async function POST(req) {
    try {
        let data = await req.json();
        await mongoose.connect(mongoUrl);
        let check = await Student.find({email:data.email});
        // console.log(check);
        if(check.length == 0) {
            // {let student = new Student(data);
            // let saved = await student.save();
            // console.log(saved);}

            let saved = await Student.insertMany([data]);      // works same as the above code
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