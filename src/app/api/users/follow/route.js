import { NextResponse } from "next/server";
import Followers from "/mongo/FollowersModel";
import { authenticateUser } from "@/utilities/authenticateUser";


export async function POST(req ) {
    try {
        let data = await req.json();
        const isVerified = authenticateUser(data.followedById);
        
        if(!isVerified) {
            return NextResponse.json({} , { status:404})
        }

        if(data.followedById === data.followedToId) {
            return NextResponse.json({success:false , message:"you can not follow yourself."});
        } 
        
        let isAny = await Followers.findOne({followedById:data.followedById , followedToId:data.followedToId});
        if(isAny) {
            return NextResponse.json({success:false , message:"you have already followed this user."});
        } else {
            const follow = new Followers(data);
            await follow.save();
            return NextResponse.json({success:true , message:"you have successfully followed." , follow});
        }
    } catch(error) {
        return NextResponse.json({success:false , message:error.message});
    }
}


export async function PUT(req) {
    try {
        let data = await req.json();
        let connection = await Followers.findOne({followedById:data.followedById , followedToId:data.followedToId});
        // console.log(data , connection);
        return NextResponse.json( {success:true , isFollowed:connection._id ? true : false} )
    } catch(error) {
        return NextResponse.json( {success:false , message:error.message} )
    }
}
