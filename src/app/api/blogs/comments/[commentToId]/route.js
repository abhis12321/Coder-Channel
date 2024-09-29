import { NextResponse } from "next/server"
import { Comment } from '/mongo/CommentModel'


export const GET = async(req , { params }) => {
    try {
        // console.log("params" , params)
        const comments = await Comment.find( params );
        return NextResponse.json({ comments }, { status:200 });
    } catch(error) {
        return NextResponse.json({ error:error.message }, { status:400 });
    }
}