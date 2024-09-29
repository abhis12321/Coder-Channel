import { NextResponse } from "next/server"
import { Comment } from '/mongo/CommentModel'


export const GET = async(req , { params }) => {
    try {
        // console.log("params" , params)
        // const comments = await Comment.find( params );
        const comments = await Comment.find({})
        .populate({
            path: 'commentById',  // Use the correct field name as per schema
            model: 'Users',       // Explicitly mention the 'Users' model
            select: 'name imgUrl' // Select name and imgUrl fields
        })
        // .populate({
        //     path: 'commentToId',  // Use the correct field name as per schema
        //     model: 'Blogs',       // Explicitly mention the 'Users' model
        //     select: 'blog' // Select name and imgUrl fields
        // })
        .exec();

        return NextResponse.json({ comments }, { status:200 });
    } catch(error) {
        console.error(error.message)
        return NextResponse.json({ error:error.message }, { status:400 });
    }
}