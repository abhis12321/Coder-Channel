import { NextResponse } from "next/server";
import Users from "/mongo/UserModel";
import cryptoJS from "crypto-js";
import mongoose from "mongoose";
import { authenticateUser } from "../../../../authenticateUser";


export async function GET(req, { params }) {
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
    // console.log(error.message);
    return NextResponse.json({ success: false, message: error.message });
  }
}


export async function POST(req, { params }) {
  try {
    let { email, pass } = await req.json();
    let user = await Users.findOne({ _id: params._id });

    let bytes = cryptoJS.AES.decrypt(user.password, email);
    let password = bytes.toString(cryptoJS.enc.Utf8);

    if (!user) {
      return NextResponse.json({ message: "bad request...! Wrong _id", success: false });
    } else if (user.verify) {
      return NextResponse.json({ message: "The email/account is already verified...!", success: true });
    } else if (password == pass) {
      user.verify = true;
      await user.save();
      return NextResponse.json({ message: "email verified...!", success: true });
    } else {
      return NextResponse.json({ message: "Invalid Password! Try again.", success: false });
    }
  }
  catch (error) {
    return NextResponse.json({ message: "bad request...!", success: false });
  }
}


export async function PUT(req, { params }) {
  try {
    let data = await req.json();
    const isVerified = authenticateUser(params._id);

    if (isVerified) {
      return NextResponse.json({}, { status: 404 });
    }

    let user = await Users.findOne({ _id: params._id });
    user.isOnline += data.isOnline;
    await user.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ data: error.message, success: false });
  }
}


export async function PATCH(request, { params }) {
  try {    
    const payload = await request.json();
    const isVerified = authenticateUser(params._id);
    if (!isVerified) {
      return NextResponse.json({}, { status: 404 })
    }
    let ciphertext = cryptoJS.AES.encrypt(payload.password, payload.email).toString();
    payload.password = ciphertext;
    await Users.findOneAndUpdate({ _id: params._id }, payload);
    return NextResponse.json({ success: true, message: "profile updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}