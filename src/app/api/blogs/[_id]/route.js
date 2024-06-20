import { NextResponse } from "next/server";
import Blog from '/mongo/BlogModel'


export async function GET(req , {params}) {
    try {
        let blogs = await Blog.find({writerId:params._id});
        return NextResponse.json({success:true , blogs});
    } catch(error) {
        return NextResponse.json({success:false , message:error.message});
    }
}