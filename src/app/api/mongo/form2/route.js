import { NextResponse } from "next/server";
import Users from '/mongo/UserModel'

export async function GET() {
    let found = await Users.find();
    return NextResponse.json({found , success:true});
}

export async function POST(req) {
    try {
        let data = await req.json();
        let check = await Users.find({email:data.email});
        // console.log(check);
        if(check.length == 0) {
            // {let login = new login(data);
            // let saved = await login.save();
            // console.log(saved);}

            let saved = await Users.insertMany([data]);      // works same as the above code
            return NextResponse.json({saved , success:true});
        }
        else {
            return NextResponse.json({sucess:false});
        }
    }
    catch(err) {
        return NextResponse.json({sucess:false});
    }
}