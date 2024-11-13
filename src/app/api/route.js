import { sendMailToAdmin } from '@/utilities/sendMailToAdmin';
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";


export const GET = async() => {
  try {
    const theme = cookies().get("theme")?.value;
    if(theme) {
      cookies().delete("theme");
    } else {
      cookies().set("theme" , "dark");
    }
    return NextResponse.json({ success:true })
  } catch(error) {
    return NextResponse.json({ success:false })
  }
} 


export const POST = async(req) => {
  try {
    const { name , email , mobile , problem } = await req.json();
    await sendMailToAdmin({ name , email , mobile , problem });
    return NextResponse.json({ message: "Your request is noted and you will be contacted from our backend team very soon with an Update."});
  } catch(error) {
    return NextResponse.json({ } , { status:404 })
  }
}
