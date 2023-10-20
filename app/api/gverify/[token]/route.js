import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import {mongoUrl , login} from '/mongo/exp'

export async function POST(req , {params}) {
    try {    
        let pas = await req.json();
        await mongoose.connect(mongoUrl);
        let data = await login.find({_id:params.token});
        
        console.log(data);
        if(data.length == 0) {
            return NextResponse.json({message:"bad request...!" , success:false});
        }
        else if(data[0].verify) {
            return NextResponse.json({message:"email is already verified...!" , success:true})
        }
        else if(data[0].password == pas ) {
            let new_data = await login.findOneAndUpdate({_id:params.token} , {$set: {verify:true}});
            return NextResponse.json({message:"email verified...!" , success:true});
        }
        else {
            return NextResponse.json({message:"Invalid Password" , success:false})
        }
    }
    catch(err) {
        return NextResponse.json({message:"bad request...! Wrong _id" , success:false});        
    }
    
}