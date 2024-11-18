import { Likes } from "/mongo/LikesModel";
import { NextResponse } from "next/server";
import { authenticateUser } from "@/utilities/authenticateUser";


export const POST = async(req) => {
    try {
        const { likedToId , likedById } = await req.json();
        const isVerified = authenticateUser(likedById);
        if(!isVerified) {
            return NextResponse.json({  } , { status: 404 });
        }
        const oldLike = await Likes.findOneAndDelete({ likedById , likedToId })
        if(oldLike) {
            return NextResponse.json({ message: "profile liked removed successfully!" })            
        }
        const nvLike = new Likes({ likedById , likedToId , likedToModel:"Users" })
        await nvLike.save();
        return NextResponse.json({ message: "profile liked successfully!" })
    } catch(error) {
        return NextResponse.json({ } , { status:404 })
    }
}