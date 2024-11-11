import { NextResponse } from "next/server"
import { Comment } from '/mongo/CommentModel'
import { getJWTUser } from "@/utilities/getJWTUser";


export const GET = async(req , { params }) => {
    try {
        const comments = await Comment.find(params)
        .populate({
            path: 'commentById',
            model: 'Users', 
            select: 'name imgUrl'
        })
        .exec();

        return NextResponse.json({ comments }, { status:200 });
    } catch(error) {
        return NextResponse.json({ error:error.message }, { status:400 });
    }
}


export const DELETE = async(req , { params }) => {
    try {
        const User = getJWTUser();
        if(!User?._id) {
            return NextResponse.json({  } , { status:404 });
        }
        await Comment.findOneAndDelete({ commentById:User._id , _id:params.commentToId })
        return NextResponse.json({ message:"your comment is deleted successfully!" });
    } catch(error) {
        return NextResponse.json({ error:error.message }, { status:400 });
    }
}