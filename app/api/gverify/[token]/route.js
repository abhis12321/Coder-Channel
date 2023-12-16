import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { login } from "/mongo/exp";
import cryptoJS from "crypto-js";

export async function POST(req, { params }) {
  try {
    let res = await req.json();
    let {email , pass} = res;
    await mongoose.connect(process.env.mongoUrl);
    let data = await login.find({ _id:params.token });

    let bytes = cryptoJS.AES.decrypt(data[0].password, email);
    let password = bytes.toString(cryptoJS.enc.Utf8);
    
    if (data.length == 0) {
      return NextResponse.json({ message: "bad request...!", success: false });
    } else if (data[0].verify) {
      return NextResponse.json({
        message: "email is already verified...!",
        success: true,
      });
    } else if (password == pass) {
      let new_data = await login.findOneAndUpdate(
        { _id: params.token },
        { $set: { verify: true } }
      );
      return NextResponse.json({
        message: "email verified...!",
        success: true,
      });
    } else {
      return NextResponse.json({ message: "Invalid Password", success: false });
    }
  } 
  catch (err) {
    return NextResponse.json({
      message: "bad request...! Wrong _id",
      success: false,
    });
  }
}
