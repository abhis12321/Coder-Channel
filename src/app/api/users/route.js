import cron from 'node-cron';
import cryptoJS from 'crypto-js'
import { sign } from "jsonwebtoken";
import Users from "/mongo/UserModel";
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";
import { sendVerificationEmail } from '@/utilities/sendVerificationMailToUser';
import { TOCKEN_MAX_AGE, CODER_CHANNEL_TOCKEN } from '@/utilities/constants';
import { verifyOPT } from '@/utilities/verifyOTP';
import { sendOTP } from '@/utilities/sendOTP';


export async function GET() {
  try {
    let users = await Users.find({ verify: true });
    return NextResponse.json({ users, success: true });
  } catch (err) {
    return NextResponse.json({ success: false });
  }
}


export async function POST(req) {
  try {
    const payload = await req.json();
    const user = new Users(payload);
    await user.save();
    await sendVerificationEmail(payload.email, user._id);
    return NextResponse.json({ message: "Verification Link sent successfully to your Email...! It will be valid only for 10 minutes, If you fails to verify within the time your registration will be cancelled. And you have to register again for further process", success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error during file upload: ' + error.message }, { status: 500 });
  }
}


export async function PUT(req) {
  try {
    let data = await req.json();
    let { email, password , OTP } = data;

    if (!email || !password) {
      return NextResponse.json({ message: "bad request! Missing credentials.", success: false });
    }

    let User = (await Users.findOne({ email })).toObject();
    let bytes = cryptoJS.AES.decrypt(User.password, email);
    let pass = bytes.toString(cryptoJS.enc.Utf8);

    if (!User || password !== pass) {
      return NextResponse.json({ message: "wrong credentials, Try again...!", success: false });
    } else if (!User.verify) {
      return NextResponse.json({ message: "email verification required...!", success: false });
    }

    if(!OTP) {
      sendOTP({ email });
      return NextResponse.json({ message: "OTP is sent to your email", success: true });
    }

    const otpVerified = verifyOPT({ email , OTP });
    if(!otpVerified) {
      return NextResponse.json({ message: "wrong OTP, Try again...!", success: false });      
    }
    delete User.password;
    const secret = process.env.JWT_SECRET_KEY || "";
    const tocken = sign({ User }, secret, { expiresIn: TOCKEN_MAX_AGE });

    // cookies().set(CODER_CHANNEL_TOCKEN, tocken, { maxAge: TOCKEN_MAX_AGE, sameSite: 'Strict' });

    cookies().set({
      name: CODER_CHANNEL_TOCKEN,
      value: tocken,
      // secure: process.env.NODE_ENV === 'production' && window.location.protocol === 'https:',
      httpOnly: true,
      sameSite: "strict",
      maxAge: TOCKEN_MAX_AGE,
      path: "/"
    });

    return NextResponse.json({ User, success: true, message: `You credentials are right and you have Logged-in...!` })
  } catch (error) {
    // console.log(error.message);
    return NextResponse.json({ message: "bad request, Try again...!", success: false });
  }
}




cron.schedule('*/10 * * * *', async () => {
  try {
    const now = new Date();
    await Users.deleteMany({
      verify: false,
      createdAt: { $lt: new Date(now - 10 * 60 * 1000) }
    });
    // console.log('Deleting unverified users registered more than 10 minutes ago');
  } catch (error) {
    console.error('Error deleting unverified users:', error.message);
  }
});
