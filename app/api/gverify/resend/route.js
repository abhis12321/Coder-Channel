import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { currUrl } from "/mongo/exp2";
import mongoose from "mongoose";
import { mongoUrl, login } from "/mongo/exp";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lucky104071@gmail.com",
    pass: "huys zgcq xbbt klui",
    // user: "jack2101660100005@gmail.com",
    // pass: "axgh psop xujz jetw",
  },
});

async function sendVerificationEmail(email, token) {
  const link = `${currUrl}/login/${token}?e=${email}`;

  const mailOptions = {
    from: "lucky104071@gmail.com",
    to: email,
    subject: "Email Verification Link",
    text: `Please click on this link to verify your email address:\n${link}\n\nIf you did not request this verification, please ignore this message.`,
    html: `<p>Hi,</p>
           <p>Please click on the link below to verify your email address.</p>
           <a href="${link}">Verify Email by clicking the bellow link <br/> ${link}</a>
           <p>If you did not request this, please ignore this email.</p>`,
  };

  return transporter.sendMail(mailOptions);
}

export async function POST(req, res) {
  let data = await req.json();
  let email = data.email;

  if (!email) {
    return NextResponse.json({ message: "Missing email...!" });
  }

  try {
    await mongoose.connect(mongoUrl);
    let check = await login.find({ email });
    
    if (check.length == 0) {
      return NextResponse.json({ message: "Email is not resistered..!" });
    }
    else if(check[0].verify) {
      return NextResponse.json({ message: "Email is already verified, you can login now..!" });
    }
    else {
        let token = check[0]._id;
        await sendVerificationEmail(email, token);
        return NextResponse.json({ message: "Verification Link sent successfully to your Email...!" });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
