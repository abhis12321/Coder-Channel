import Blog from '/mongo/BlogModel';
import { NextResponse } from "next/server";
import "/mongo/UserModel";
import { BlogLikes } from "/mongo/BlogLikesModel";
import { getJWTUser } from '@/getJWTUser';


export const GET = async (req, { params }) => {
    try {
        const userId = params._id;
        const blogs = await Blog.find({})
                            .sort({ time: -1 })
                            .populate({
                                path: 'writerId',   // targeting through
                                model: 'Users',       // targeting to
                                select: 'name imgUrl' // field to select
                            })
                            .lean() //  Mongoose documents => js objects
                            .exec();

        // Map over blogs and check if the user has liked each blog
        const blogsWithLikes = await Promise.all(blogs.map(async (blog) => {
                    const liked = await BlogLikes.findOne({ blogId: blog._id,  userId }).exec();
                    return {
                        ...blog,
                        liked: liked !== null
                    };
                }));

        return NextResponse.json({ blogs: blogsWithLikes, success: true }); 
    } catch (error) {
        // console.log(error.message)
        return NextResponse.json({ message: error.message, success: false });
    }
}


export async function POST(req, { params }) {
    try {    
        const User = getJWTUser();    
        let blogs = await Blog.find({ writerId: params._id })
                            .sort({ time: -1 })
                            .populate({
                                path: 'writerId',   // targeting through
                                model: 'Users',       // targeting to
                                select: 'name imgUrl' // field to select
                            })
                            .lean()
                            .exec();
        
        if(!User || !User._id) {
            return NextResponse.json({ success: true, blogs });
        }
               
        const blogsWithLikes = await Promise.all(blogs.map(async (blog) => {
                                const liked = await BlogLikes.findOne({ blogId: blog._id,  userId: User._id, }).exec();
            
                                return {
                                    ...blog,
                                    liked: liked !== null // true if the user has liked this blog, otherwise false
                                };
                            }));

        return NextResponse.json({ success: true, blogs:blogsWithLikes });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ success: false, message: error.message });
    }
}
