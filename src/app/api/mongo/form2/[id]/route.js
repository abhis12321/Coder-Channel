import { NextResponse } from "next/server";
import Users from '/mongo/UserModel';

export async function GET(req , {params}) {
    try {
        let data = await Users.findOne({_id:params.id})
        return NextResponse.json({...data._doc , success:true});
    }
    catch(err) {
        return NextResponse.json({data:err.message , success:false});
    }
}