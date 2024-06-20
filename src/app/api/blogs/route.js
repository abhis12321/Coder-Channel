import { NextResponse } from "next/server";
import Blog from "/mongo/BlogModel";

export async function GET() {
    try {
        let blogs = await Blog.find();
        return NextResponse.json({success:true , blogs})
    } catch(error) {
        NextResponse.json({ success:false , message:error.message })
    }
}


export async function POST( req ) {
    try {
        let body = await req.json();
        let blog = new Blog(body);
        await blog.save();
        return NextResponse.json({success:true , message:"your blog is posted successfylly" , blog});
    } catch(error) {
        return NextResponse.json({success:false , message:error.message});
    }
}