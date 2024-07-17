import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Users from "/mongo/UserModel";

let infostr = "user:" + process.env.USER +" pass:" +process.env.E_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.E_PASS,
  },
});

async function sendVerificationEmail(email, token , origin) {
  origin = "https://coder-media.onrender.com/"
  const link = `${origin}/login/${token}?e=${email}`;

  const mailOptions = {
    from: process.env.USER,
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
  let origin = (req.url).slice(0 , -17);
  let data = await req.json();
  let email = data.email;

  if (!email) {
    return NextResponse.json({ message: "Missing email...!" });
  }

  try {
    let check = await Users.find({ email });
    
    if (check.length == 0) {
      return NextResponse.json({ message: "Email is not resistered..!" });
    }
    else if(check[0].verify) {
      return NextResponse.json({ message: "Email is already verified, you can login now..!" });
    }
    else {
        let token = check[0]._id;
        await sendVerificationEmail(email, token , origin);
        return NextResponse.json({ message: "Verification Link sent successfully to your Email...!" , infostr });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message , infostr });
  }
}
