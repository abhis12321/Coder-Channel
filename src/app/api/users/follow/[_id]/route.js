import { NextResponse } from "next/server";
import Followers from "/mongo/Followers";

//Find Followers
export async function GET(req , {params}) {
    try {
        const followers = await Followers.find({followedToId:params._id});
        return NextResponse.json({followers , success:true});
    } catch(error) {
        return NextResponse.json({message:error.message , success:false})
    }
}