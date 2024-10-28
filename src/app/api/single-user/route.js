import { verify } from "jsonwebtoken";
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";
import { CODER_CHANNEL_TOCKEN } from '../../../constants';


// export async function GET() {
//     try {
//         const tocken = cookies().get(CODER_CHANNEL_TOCKEN)?.value;
//         const secret = process.env.JWT_SECRET_KEY || "";
        
//         if(!tocken) {
//             return NextResponse.json({ success:false, message:"no user fouUsernd, please login with your email and password." });
//         }
//         const { User } = verify(tocken , secret);
//         // let User = (await Users.findOne({ _id })).toObject();
        
//         if(!User) {
//             return NextResponse.json({ message:"#something went wrong please login with your email and password.", success:false });
//         }
        
//         delete User.password;        
//         return NextResponse.json({ User , success:true });
//     }
//     catch(error) {
//         // console.log("tocken", error.message)
//         return NextResponse.json({ message:"something went wrong please login with your email and password.", success:false });
//     }
// }

export async function GET() {
    try {
        cookies().delete(CODER_CHANNEL_TOCKEN)
        return NextResponse.json({message:"logged-out" , success:true});
    }
    catch(error) {
        return NextResponse.json({data:error.message , success:false});
    }
}
