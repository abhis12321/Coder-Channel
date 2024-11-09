import Blog from '/mongo/BlogModel';
import { NextResponse } from "next/server";
import "/mongo/UserModel";
import { BlogLikes } from "/mongo/BlogLikesModel";
import { cookies } from 'next/headers';
import { CODER_CHANNEL_TOCKEN } from '@/constants';
import { authenticateUser } from '@/authenticateUser';
import { verify } from 'jsonwebtoken';


export const GET = async (req, { params }) => {
    try {
        const userId = params._id;
        const blogs = await Blog.find({})
                            .sort({ time: -1 })
                            .populate({
                                path: 'writerId',   // Populate the writer's information
                                model: 'Users',       // Explicitly mention the 'Users' model
                                select: 'name imgUrl' // Only select needed fields from Users
                            })
                            .lean() // Use lean() to get plain JavaScript objects instead of Mongoose documents
                            .exec();

        // console.log(blogs);
        // Map over blogs and check if the user has liked each blog
        const blogsWithLikes = await Promise.all(blogs.map(async (blog) => {
                    const liked = await BlogLikes.findOne({ blogId: blog._id,  userId }).exec();
                    return {
                        ...blog,
                        liked: liked !== null // true if the user has liked this blog, otherwise false
                    };
                }));

        return NextResponse.json({ blogs: blogsWithLikes, success: true }); // Return the blogs with like status
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: error.message, success: false });
    }
}


export async function POST(req, { params }) {
    try {        
        const tocken = cookies().get(CODER_CHANNEL_TOCKEN)?.value;
        const secret = process.env.JWT_SECRET_KEY || "";        
        const { User } = verify(tocken , secret);
        const userId = User._id;

        let blogs = await Blog.find({ writerId: params._id })
                            .sort({ time: -1 })
                            .populate({
                                path: 'writerId',  // Use the correct field name as per schema
                                model: 'Users',       // Explicitly mention the 'Users' model
                                select: 'name imgUrl' // Select name and other fields
                            })
                            .lean()
                            .exec();
        
        const blogsWithLikes = await Promise.all(blogs.map(async (blog) => {
                                const liked = await BlogLikes.findOne({ blogId: blog._id,  userId, }).exec();
            
                                return {
                                    ...blog,
                                    liked: liked !== null // true if the user has liked this blog, otherwise false
                                };
                            }));
        // console.log(blogs);
        // console.log(blogsWithLikes);

        return NextResponse.json({ success: true, blogs:blogsWithLikes });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
