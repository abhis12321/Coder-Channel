import { NextResponse } from "next/server";
import User from "/mongo/UserModel";
import mongoose from "mongoose";
import { cookies } from 'next/headers';

export async function GET() {
  console.log("/api" , "GET")
  try {
    // await User.updateMany(
    //   { verify: true },
    //   { $set: { isOnline: 0 } }
    // );

    return NextResponse.json({success:true})
  } catch(error) {
    return NextResponse.json(error);
  }
}

export async function POST(req) {
  try {
    let userId = await req.json();
    userId = userId?._id || "663d70c3df20b6ad463f8afa";
    
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'followers',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$followedToId', '$$userId'] },
                    { $eq: ['$followedById', new mongoose.Types.ObjectId(userId)] }
                  ]
                }
              }
            },
            { $limit: 1 }
          ],
          as: 'followStatus'
        }
      },
      {
        $addFields: {
          isFollowing: { $gt: [{ $size: '$followStatus' }, 0] }
        }
      },
      {
        $project: {
          followStatus: 0,
          password: 0 // exclude password field
        }
      }
    ]);

    return NextResponse.json({ success: true, users });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function PUT(req) {
  try {
      let { theme } = await req.json();
      cookies().set("theme" , theme);
      return NextResponse.json({ success:true , message:"theme updated." });
  } catch(error) {
      return NextResponse.json({ success:false , message:error.message });
  }
}