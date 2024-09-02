import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function GET() {
    try {
        return NextResponse.json({ success:true });
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
