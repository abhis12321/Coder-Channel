import { NextResponse } from "next/server"
import { BlogLikes } from '/mongo/BlogLikesModel'
import { authenticateUser } from "@/utilities/authenticateUser";

export const POST = async(req) => {
    try {
        const { blogId , userId} = await req.json();
        const isVerified = authenticateUser(userId);

        if(!isVerified) {
            return NextResponse.json({ } , { status:404 });
        }

        const prevlike = await BlogLikes.findOneAndDelete({ blogId , userId });

        if(prevlike) {
            return NextResponse.json({ message:"unlikes request received.." });
        }

        const newlike = new BlogLikes({ blogId , userId });
        // console.log(body , BlogLikes , newlike);
        await newlike.save();
        return NextResponse.json({ message:"likes request received.." });
    } catch(error) {
        // console.error(error.message)
        return NextResponse.json({ message:"Bad request! try again.." }, { status:404 });
    }
}