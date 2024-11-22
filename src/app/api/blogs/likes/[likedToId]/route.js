import "/mongo/UserModel";
import { NextResponse } from "next/server"
import { Likes } from "/mongo/LikesModel";


export const GET = async (req, { params }) => {
    try {
        const AllLikes = await Likes.find(params)
                            .populate({
                                path: "likedById",
                                model: "Users",
                                select: "name imgUrl university"
                            })
                            .lean()
                            .exec();
        return NextResponse.json({ success:true , AllLikes });
    } catch(error) {
        return NextResponse.json({ } , { status: 404 });
    }
}