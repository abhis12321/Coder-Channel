import { NextResponse } from "next/server";
import Users from "/mongo/UserModel";
import cryptoJS from "crypto-js";
import mongoose from "mongoose";


export async function GET(req , {params}) {
    try {
      let userId = params._id;
      
      const users = await Users.aggregate([
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
      console.log(error.message);      
      return NextResponse.json({ success: false, message: error.message });
    }
}


export async function POST(req, { params }) {
  try {
    let res = await req.json();
    let { email, pass } = res;
    let data = await Users.find({ _id: params._id });

    let bytes = cryptoJS.AES.decrypt(data[0].password, email);
    let password = bytes.toString(cryptoJS.enc.Utf8);

    if (!data) {
      return NextResponse.json({ message: "bad request...! Wrong _id", success: false });
    } else if (data[0].verify) {
      return NextResponse.json({
        message: "The email/account is already verified...!",
        success: true,
      });
    } else if (password == pass) {
      await Users.findOneAndUpdate(
        { _id: params._id },
        { $set: { verify: true } }
      );
      return NextResponse.json({
        message: "email verified...!",
        success: true,
      });
    } else {
      return NextResponse.json({ message: "Invalid Password! Try again.", success: false });
    }
  }
  catch (error) {
    return NextResponse.json({
      message: "bad request...!",
      success: false,
    });
  }
}


export async function PUT(req , {params}) {
  try {
      let data = await req.json();
      let user = await Users.findOne({ _id:params._id });
      user.isOnline += data.isOnline;
      await user.save();
      return NextResponse.json({success:true});
  } catch(error) {
      return NextResponse.json({data:error.message , success:false});
  }
}


export async function PATCH(request , {params}) {
  try {
    let body = await request.json();
    let ciphertext = cryptoJS.AES.encrypt(body.password, body.email).toString();
    await Users.findOneAndUpdate({_id:params._id } , {...body , password:ciphertext});
    return NextResponse.json({success:true , message:"profile updated successfully"});
  } catch(error) {
    console.log(error.message);
    return NextResponse.json({success:false , message:error.message});
  }
}