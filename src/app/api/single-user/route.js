import { cookies } from 'next/headers';
import { NextResponse } from "next/server";
import { CODER_CHANNEL_TOCKEN } from '@/utilities/constants';


export async function GET() {
    try {
        cookies().delete(CODER_CHANNEL_TOCKEN)
        return NextResponse.json({message:"logged-out" , success:true});
    }
    catch(error) {
        return NextResponse.json({data:error.message , success:false});
    }
}
