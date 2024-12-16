import cryptoJS from "crypto-js";
import Users from "/mongo/UserModel";
import { NextResponse } from "next/server";
import { sendPasswordToUser } from "@/utilities/sendPasswordToUser";


export async function POST(req) {
  try {
    let {email} = await req.json();
    if (!email) return NextResponse.json({ message: "Missing email or token" });
    let user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Email is not resistered..!" });
    } else {
      let bytes = cryptoJS.AES.decrypt(user.password, email);
      let pass = bytes.toString(cryptoJS.enc.Utf8);
      await sendPasswordToUser({ email, pass });
      return NextResponse.json({ message: "Your Password sent successfully to your Email...!" });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message  });
  }
}
