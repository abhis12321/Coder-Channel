import { NextResponse } from "next/server";
import Blog from '/mongo/BlogModel'
import { BlogLikes } from "/mongo/BlogLikesModel";


export async function POST(req , {params}) {
    try {
        let blogs = await Blog.find({writerId:params._id})
                            .sort({ time: -1 })        
                            .populate({
                                path: 'writerId',  // Use the correct field name as per schema
                                model: 'Users',       // Explicitly mention the 'Users' model
                                select: 'name imgUrl' // Select name and other fields
                            })
                            .exec();
        return NextResponse.json({success:true , blogs});
    } catch(error) {
        return NextResponse.json({success:false , message:error.message});
    }
}

export const GET = async(req , { params }) => {
    try {
        // Find all blogs
        const userId = params._id;
        // console.log(userId , params)
        const blogs = await Blog.find({})
            .populate({
                path: 'writerId',   // Populate the writer's information
                select: 'name imgUrl' // Only select needed fields from Users
            })
            .sort({time : -1})
            .lean() // Use lean() to get plain JavaScript objects instead of Mongoose documents
            .exec();
  
        // Map over blogs and check if the user has liked each blog
        const blogsWithLikes = await Promise.all(blogs.map(async (blog) => {
            const liked = await BlogLikes.findOne({
                blogId: blog._id,
                userId,
            }).exec();
  
            return {
                ...blog,
                liked: liked !== null // true if the user has liked this blog, otherwise false
            };
        }));
  
        return NextResponse.json({ blogs: blogsWithLikes, success:true }); // Return the blogs with like status
    } catch (error) {
        return NextResponse.json({ message: error.message, success:false });
    }
}
