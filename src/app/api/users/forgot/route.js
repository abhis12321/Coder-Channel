import cryptoJS from "crypto-js";
import Users from "/mongo/UserModel";
import { NextResponse } from "next/server";
import { sendPasswordToUser } from "@/utilities/sendPasswordToUser";


export async function POST(req) {
  try {
    let data = await req.json();
    let email = data.email;

    if (!email) return NextResponse.json({ message: "Missing email or token" });
    let check = await Users.find({ email });

    if (check.length == 0) {
      return NextResponse.json({ message: "Email is not resistered..!" });
    } else {
      let bytes = cryptoJS.AES.decrypt(check[0].password, email);
      let pass = bytes.toString(cryptoJS.enc.Utf8);

      await sendPasswordToUser({ email, pass });
      return NextResponse.json({ message: "Your Password sent successfully to your Email...!" });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message  });
  }
}
