import Blog from "/mongo/BlogModel";
import { NextResponse } from "next/server";
import { authenticateUser } from "../../../authenticateUser";

export async function GET() {
    try {
        let blogs = await Blog.find().sort({ time: -1 })        
                            .populate({
                                path: 'writerId',  // Use the correct field name as per schema
                                model: 'Users',       // Explicitly mention the 'Users' model
                                select: 'name imgUrl' // Select name and other fields
                            })
                            .exec();
        return NextResponse.json({success:true , blogs});
    } catch(error) {
        NextResponse.json({ success:false , message:error.message });
    }
}


export async function POST( req ) {
    try {
        let body = await req.json();
        const isVerified = authenticateUser(body.writerId);

        if(!isVerified) {
            return NextResponse.json({} , { status:404 });       
        }

        let blog = new Blog(body);
        await blog.save();
        // console.log(blog);
        return NextResponse.json({success:true , message:"your blog is posted successfylly" , blog});
    } catch(error) {
        // console.error(error.message)
        return NextResponse.json({success:false , message:error.message});
    }
}