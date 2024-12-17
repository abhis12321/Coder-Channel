import cron from 'node-cron';
import cryptoJS from 'crypto-js'
import Users from "/mongo/UserModel";
import { NextResponse } from "next/server";
import { sendOTP } from '@/utilities/sendOTP';
import { verifyOPT } from '@/utilities/verifyOTP';
import { setJWTUser } from '@/utilities/getJWTUser';
import { sendVerificationEmail } from '@/utilities/sendVerificationMailToUser';


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
    let { name, email, password, gender } = await req.json();
    password = cryptoJS.AES.encrypt(password, email).toString();      // Encrypt a password
    const user = new Users({ name , email , gender, password });
    await user.save();
    const origin = new URL(req.url)?.origin;
    await sendVerificationEmail(email, user._id, origin);
    return NextResponse.json({ message: "Verification Link sent successfully to your Email...! It will be valid only for 10 minutes, If you fails to verify within the time your registration will be cancelled. And you have to register again for further process", success: true });
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ error: 'Error during file upload: ' + error.message }, { status: 500 });
  }
}


export async function PUT(req) {
  try {
    let data = await req.json();
    let { email, password, OTP } = data;

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

    if (!OTP) {
      sendOTP({ email });
      return NextResponse.json({ message: "OTP is sent to your email", success: true });
    }

    const otpVerified = verifyOPT({ email, OTP });
    if (!otpVerified) {
      return NextResponse.json({ message: "wrong OTP, Try again...!", success: false });
    }

    delete User.password;
    setJWTUser(User);

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
