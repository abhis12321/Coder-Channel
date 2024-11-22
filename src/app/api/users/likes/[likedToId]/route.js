import { NextResponse } from "next/server"
import { Likes } from "/mongo/LikesModel";

export const GET = async(req , { params }) => {
    try {
        const likes = await Likes.find(params)
                        .populate({
                            path:"likedById",
                            model:"Users",
                            select:"name imgUrl university"
                        })
                        .exec();
        return NextResponse.json({ likes });
    } catch(error) {
        return NextResponse.json({ } , { status:404 });
    }
}