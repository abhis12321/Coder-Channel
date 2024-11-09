import "/mongo/UserModel";
import { NextResponse } from "next/server"
import { BlogLikes } from "/mongo/BlogLikesModel";


export const GET = async (req, { params }) => {
    try {
        // console.log(params , BlogLikes)
        const AllLikes = await BlogLikes.find(params)
                            .populate({
                                path: "userId",
                                model: "Users",
                                select: "name , imgUrl"
                            })
                            .lean()
                            .exec();
        return NextResponse.json({ success:true , AllLikes });
    } catch(error) {
        console.log(error.message)
        return NextResponse.json({ } , { status: 404 });
    }
}