import mongoose from "mongoose";
import { NextResponse } from "next/server";
// import {user} from './user'

const {mongo_username3 , mongo_password3} = process.env;
const connect2 = `mongodb+srv://${mongo_username3}:dJ68kiYeDaV7gsHL@mongo1.jrugiqf.mongodb.net/mongonext1?retryWrites=true&w=majority`;

const model1 = new mongoose.Schema({        // data model
    fname:String,
    lname:String,
    school:String,
    age:Number,
    year:Number,
    branch:String,


});
const user = mongoose.models.next1 || mongoose.model('next1' , model1);  // constructor


export async function GET(req) {
    await mongoose.connect(connect2)
    let data = await user.find();
    console.log(data);
    return NextResponse.json({success:true});
}

export async function POST(req) {
    let res =  await req.json();
    console.log(res);
    await mongoose.connect(connect2);
    let datum = new user({
        name:res.fname,
        lname:res.lname,
        age:res.age,
        school:res.school,
        year:res.year,
        branch:res.branch
    })
    let data = await datum.save();      //save the data to mongodb

    return NextResponse.json({data , success:true});
    // return NextResponse.json({success:true});
}