import { NextResponse } from "next/server";
import Blog from "/mongo/BlogModel";


export async function POST(req , res) {
    try {
        let body = await req.json();
        console.log(body);
        let blog = new Blog(body);
        await blog.save();
        return NextResponse.json({success:true , message:"your blog is posted successfylly" , blog});
    } catch(error) {
        return NextResponse.json({success:false , message:error.message});
    }
}