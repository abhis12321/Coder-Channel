import { NextResponse } from "next/server"
import { BlogLikes } from '/mongo/BlogLikesModel'

export const POST = async(req) => {
    try {
        const body = await req.json();
        const prevlike = await BlogLikes.findOneAndDelete(body);

        if(prevlike) {
            return NextResponse.json({ message:"unlikes request received.." });
        }

        const newlike = new BlogLikes(body);
        // console.log(body , BlogLikes , newlike);
        await newlike.save();
        return NextResponse.json({ message:"likes request received.." });
    } catch(error) {
        return NextResponse.json({ message:"Bad request! try again.." }, { status:404 });
    }
}