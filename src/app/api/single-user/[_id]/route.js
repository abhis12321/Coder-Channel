import { NextResponse } from "next/server";
import Users from "/mongo/UserModel";


export async function GET(req , {params}) {
    try {
        let user = (await Users.findOne({ _id:params._id, verify:true })).toObject();
        delete user.password;
        // console.log(user)
        return NextResponse.json({ user , success:true });
    }
    catch(error) {
        return NextResponse.json({data:error.message , success:false});
    }
}
