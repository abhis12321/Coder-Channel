import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import { mongoUrl, login } from "/mongo/exp";
import cryptoJS from "crypto-js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lucky104071@gmail.com",
    pass: "huys zgcq xbbt klui",
    // user: "jack2101660100005@gmail.com",
    // pass: "axgh psop xujz jetw",
  },
});

async function sendVerificationEmail(email, pass) {
  const mailOptions = {
    from: "lucky104071@gmail.com",
    to: email,
    subject: "password forgot",
    text: `Please use this password to login with your email address:\n${pass}\n\nIf you did not request this password, please ignore this message.`,
    html: `<p>Hi,</p>
             <p>Please use the Password below to login with your email address.</p>
             <h3>password is:  <h1> ${pass}</h1></h3>
             <p>If you did not request this, please ignore this email.</p>`,
  };

  return transporter.sendMail(mailOptions);
}

export async function POST(req) {
  try {
    let data = await req.json();
    let email = data.email;

    if (!email) return NextResponse.json({ message: "Missing email or token" });

    await mongoose.connect(mongoUrl);
    let check = await login.find({ email });

    if (check.length == 0) {
      return NextResponse.json({ message: "Email is not resistered..!" });
    } else {
      let bytes = cryptoJS.AES.decrypt(check[0].password, email);
      let pass = bytes.toString(cryptoJS.enc.Utf8);

      await sendVerificationEmail(email, pass);
      return NextResponse.json({
        message: "Your Password sent successfully to your Email...!",
      });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
