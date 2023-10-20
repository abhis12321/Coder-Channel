import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { mongoUrl, login } from "/mongo/exp";

export async function POST(req) {
  let data = await req.json();
  // console.log(data);
  let {email , password} = data;

  if (!email) {
    return NextResponse.json({ message: "bad request", success:false });
  }

  try {
    await mongoose.connect(mongoUrl);
    let check = await login.find({ email });
  
    if (check.length == 0) {
      return NextResponse.json({message:"No such account found...!" , success:false});
    }
    else if(check[0].password == password) {
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
