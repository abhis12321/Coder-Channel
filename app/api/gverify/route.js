import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import { login } from "/mongo/exp";
import cryptoJS from 'crypto-js'

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.epass,
    // user: "jack2101660100005@gmail.com",
    // pass: "axgh psop xujz jetw",
  },
});

async function sendVerificationEmail(email, token) {
  const link = `${currUrl}/login/${token}?e=${email}`;

  const mailOptions = {
    from: process.env.user,
    to: email,
    subject: "Email Verification",
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
  var secretKey = email;

// Encrypt a message
  let ciphertext = cryptoJS.AES.encrypt(data.password, secretKey).toString();

  if (!email) {
    return NextResponse.json({ message: "Missing email or token" });
  }

  try {
    await mongoose.connect(process.env.mongoUrl);
    let check = await login.find({ email });
    if (check.length > 0) {
      return NextResponse.json({ message: "Email already resistered..!" });
    }

    let token = await login.insertMany([{...data , verify:false , password:ciphertext}]);
    // console.log(token);
    token = token[0]._id;
    await sendVerificationEmail(email, token);
    return NextResponse.json({ message: "Verification Link sent successfully to your Email...!" });
  } 
  catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
