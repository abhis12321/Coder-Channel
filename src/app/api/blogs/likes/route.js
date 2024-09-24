import { NextResponse } from "next/server"
import { BlogLikes } from '/mongo/BlogLikesModel'

export const POST = async(req) => {
    try {
        const body = await req.json();
        const newlike = new BlogLikes(body);
        await newlike.save();
        // console.log(body , BlogLikes , newlike);
        return NextResponse.json({ message:"likes request received.." });
    } catch(error) {
        return NextResponse.json({ message:"Bad request! try again.." }, { status:404 });
    }
}