import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Users from "/mongo/UserModel";
import cryptoJS from 'crypto-js'
import cron from 'node-cron';

cron.schedule('*/10 * * * *', async () => {
  try {
    const now = new Date();
    await Users.deleteMany({
      verify: false,
      createdAt: { $lt: new Date(now - 10 * 60 * 1000) }
    });
    console.log('Deleting unverified users registered more than 10 minutes ago');
  } catch (error) {
    console.error('Error deleting unverified users:', error.message);
  }
});

export async function GET() {
  try {
    let users = await Users.find();
    return NextResponse.json({ users, success: true });
  } catch (err) {
    return NextResponse.json({ success: false });
  }
}


export async function POST(req, res) {
  try {
    let data = await req.json();
    let email = data.email;
    // Encrypting the password
    let ciphertext = cryptoJS.AES.encrypt(data.password, email).toString();
    let user = new Users({ ...data, verify: false, password: ciphertext });
    await user.save();

    await sendVerificationEmail(email, user._id);
    return NextResponse.json({ message: "Verification Link sent successfully to your Email...! It will be valid only for 10 minutes, If you fails to verify within the time your registration will be cancelled. And you have to register again for further process", success: true });
  }
  catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}


export async function PUT(req) {
  try {
    let data = await req.json();
    let { email, password } = data;

    if (!email) {
      return NextResponse.json({ message: "bad request! No email found.", success: false });
    }

    let User = await Users.findOne({ email });
    let bytes = cryptoJS.AES.decrypt(User.password, email);
    let pass = bytes.toString(cryptoJS.enc.Utf8);

    if (!User) {
      return NextResponse.json({ message: "No such account found...!", success: false });
    }
    else if (password == pass) {
      if (User.verify) {
        return NextResponse.json({ User, success: true, message: `You credentials are right and you have Logged-in...!` })
      }
      else {
        return NextResponse.json({ message: "email verification required...!", success: false })
      }
    } else {
      return NextResponse.json({ success: false, message: "Wrong credentials!" })
    }
  } catch (error) {
    return NextResponse.json({ message: "bad request, Try again...!", success: false });
  }
}


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.E_PASS,
  },
});

async function sendVerificationEmail(email, token) {
  let hostname = process.env.DOMAIN_LINK;
  const link = `${hostname}/login/${token}?e=${email}`;

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Email Verification",
    text: `Please click on this link to verify your email address:\n${link}\n\nIf you did not request this verification, please ignore this message.`,
    html: `<p>Hi,</p>
             <p>Please click on the link below to verify your email address.</p>
             <a href="${link}">Verify Email by clicking the bellow link <br/> ${link}</a>
             <p>It will be valid only for 10 minutes, If you fails to verify within the time, your registration will be cancelled. And you have to register again for further process.</p>
             <p>If you did not request this, please ignore this email.</p>`,
  };

  return transporter.sendMail(mailOptions);
}