import { Likes } from '/mongo/LikesModel'
import { NextResponse } from "next/server"
import { authenticateUser } from "@/utilities/authenticateUser";

export const POST = async(req) => {
    try {
        const { blogId , userId} = await req.json();
        const isVerified = authenticateUser(userId);

        if(!isVerified) {
            return NextResponse.json({ } , { status:404 });
        }

        const prevlike = await Likes.findOneAndDelete({ likedToId:blogId , likedById:userId });

        if(prevlike) {
            return NextResponse.json({ message:"unlikes request received.." });
        }

        const newlike = new Likes({ likedToId:blogId , likedById:userId , likedToModel:"Blogs" });
        await newlike.save();
        return NextResponse.json({ message:"likes request received.." });
    } catch(error) {
        console.log("Error => " , error.message)
        return NextResponse.json({ message:"Bad request! try again.." }, { status:404 });
    }
}