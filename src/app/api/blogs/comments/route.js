import { NextResponse } from "next/server"
import { Comment } from '/mongo/CommentModel'
import { authenticateUser } from "../../../../authenticateUser";


export const POST = async(req) => {
    try {
        const body = await req.json();
        const isVerified = authenticateUser(body.commentById);
        
        if(!isVerified) {
            return NextResponse.json({ } , { status:404 });
        }

        const comment = new Comment(body);
        await comment.save();
        return NextResponse.json({ message: "Your Comment posted successfully..", success: true })
    } catch(error) {
        // console.error(error.message)
        return NextResponse.json({ error: `Bad request! ${error.message}..` } , { status:400 })
    }
}