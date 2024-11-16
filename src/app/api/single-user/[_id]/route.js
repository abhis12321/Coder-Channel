import Users from "/mongo/UserModel";
import { NextResponse } from "next/server";


export async function GET(req , {params}) {
    try {
        let user = (await Users.findOne({ _id:params._id, verify:true })).toObject();
        delete user.password;
        return NextResponse.json({ user , success:true });
    }
    catch(error) {
        return NextResponse.json({data:error.message , success:false});
    }
}
