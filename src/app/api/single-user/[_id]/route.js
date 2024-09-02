import { NextResponse } from "next/server";
import Users from "/mongo/UserModel";


export async function GET(req , {params}) {
    try {
        let data = await Users.findOne({ _id:params._id, verify:true });
        return NextResponse.json({...data._doc , success:true});
    }
    catch(error) {
        return NextResponse.json({data:error.message , success:false});
    }
}
