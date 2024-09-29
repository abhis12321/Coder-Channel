import { NextResponse } from "next/server";
import Followers from "/mongo/FollowersModel";

//Find Followers
export async function GET(req , {params}) {
    try {
        const followers = await Followers.find({followedToId:params._id})
                                        .populate({
                                            path: 'followedById',  // Use the correct field name as per schema
                                            model: 'Users',       // Explicitly mention the 'Users' model
                                            select: 'name' // Select name and other fields
                                        })
                                        .populate({
                                            path: 'followedToId',  // Use the correct field name as per schema
                                            model: 'Users',       // Explicitly mention the 'Users' model
                                            select: 'name' // Select name and other fields
                                        })
                                        .exec();
        return NextResponse.json({followers , success:true});
    } catch(error) {
        return NextResponse.json({message:error.message , success:false})
    }
}

//Find Followings
export async function POST(req , {params}) {
    try {
        const followings = await Followers.find({followedById:params._id})
        .populate({
            path: 'followedById',  // Use the correct field name as per schema
            model: 'Users',       // Explicitly mention the 'Users' model
            select: 'name' // Select name and other fields
        })
        .populate({
            path: 'followedToId',  // Use the correct field name as per schema
            model: 'Users',       // Explicitly mention the 'Users' model
            select: 'name' // Select name and other fields
        })
        .exec();
        return NextResponse.json({followings , success:true});
    } catch(error) {
        return NextResponse.json({message:error.message , success:false})
    }
}


export async function DELETE(req , {params}) {
    try {
        await Followers.findByIdAndDelete(params._id);
        return NextResponse.json({ success:true , message:"Task completed." });
    } catch(error) {
        console.log("error...");
        return NextResponse.json({ success:false , message:error.message });
    }
}