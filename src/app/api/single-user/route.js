import { NextResponse } from "next/server";
import Users from "/mongo/UserModel";
import { cookies } from 'next/headers';

export async function GET() {
    try {
        let data = await Users.findOne({_id:params._id});
        return NextResponse.json({...data._doc , success:true});
    }
    catch(error) {
        return NextResponse.json({data:error.message , success:false});
    }
}

export async function POST() {
    try {
        cookies().delete("coder-channel-login-info");
        return NextResponse.json({message:"logged-out" , success:true});
    }
    catch(error) {
        return NextResponse.json({data:error.message , success:false});
    }
}
