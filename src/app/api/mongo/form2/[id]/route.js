import { NextResponse } from "next/server";
import {login} from '/mongo/exp';
import mongoose from "mongoose";

export async function GET(req , {params}) {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        let data = await login.findOne({_id:params.id})
        return NextResponse.json({...data._doc , success:true});
    }
    catch(err) {
        return NextResponse.json({data:err.message , success:false});
    }
    
}

// export async function PUT(req , {params}) {
//     try {
//         let data = await req.json();
//         await mongoose.connect(process.env.MONGO_URL);
//         let user_data = await login.findOneAndUpdate({_id:params.id} , {$set: {...data}});
//         return NextResponse.json({...user_data , success:true});
//     }
//     catch(err) {
//         return NextResponse.json({success:false});
//     }
// }


// export async function DELETE(req , {params}) {
//     try {
//         await mongoose.connect(process.env.MONGO_URL);
//         await login.deleteOne({_id:params.id});
//         return NextResponse.json({success:true});
//     }
//     catch(err) {
//         return NextResponse.json({success:false});
//     }
// }