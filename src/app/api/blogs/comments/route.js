import { NextResponse } from "next/server"
import { Comment } from '/mongo/CommentModel'


export const POST = async(req) => {
    try {
        const body = await req.json();
        const comment = new Comment(body);
        await comment.save();
        return NextResponse.json({ message: "Comment request is received for the blog..", success: true })
    } catch(error) {
        return NextResponse.json({ error: `Bad request! ${error.message}..` } , { status:400 })
    }
}