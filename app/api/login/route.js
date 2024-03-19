import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { login } from "/mongo/exp";
import cryptoJS from 'crypto-js'

export async function POST(req) {
  let data = await req.json();
  let {email , password} = data;
  
  if (!email) {
    return NextResponse.json({ message: "bad request", success:false });
  }

  try {
    await mongoose.connect(process.env.mongoUrl);
    let check = await login.find({ email });
  
    let bytes = cryptoJS.AES.decrypt(check[0].password , email);
    let pass = bytes.toString(cryptoJS.enc.Utf8);
  
    if (check.length == 0) {
      return NextResponse.json({message:"No such account found...!" , success:false});
    }
    else if(password == pass) {
      if(check[0].verify) {
        let User = check[0];
        return NextResponse.json({User , success:true, message:`You credentials are right and you have Logged-in...!`})
      }
      else {
        return NextResponse.json({message:"email verification required...!" , success:false})
      }
    }
  } catch (error) {
    return NextResponse.json({message:"bad request, Try again...!" , success:false});
  }
}
