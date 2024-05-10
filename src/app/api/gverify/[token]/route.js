import { NextResponse } from "next/server";
import Users from "/mongo/UserModel";
import cryptoJS from "crypto-js";

export async function POST(req, { params }) {
  try {
    let res = await req.json();
    let { email, pass } = res;
    let data = await Users.find({ _id: params.token });

    let bytes = cryptoJS.AES.decrypt(data[0].password, email);
    let password = bytes.toString(cryptoJS.enc.Utf8);

    if (!data) {
      return NextResponse.json({ message: "bad request...! Wrong _id", success: false });
    } else if (data[0].verify) {
      return NextResponse.json({
        message: "The email/account is already verified...!",
        success: true,
      });
    } else if (password == pass) {
      await Users.findOneAndUpdate(
        { _id: params.token },
        { $set: { verify: true } }
      );
      return NextResponse.json({
        message: "email verified...!",
        success: true,
      });
    } else {
      return NextResponse.json({ message: "Invalid Password! Try again.", success: false });
    }
  }
  catch (err) {
    return NextResponse.json({
      message: "bad request...!",
      success: false,
    });
  }
}
