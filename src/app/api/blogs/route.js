import "/mongo/UserModel";
import Blog from "/mongo/BlogModel";
import { NextResponse } from "next/server";
import { authenticateUser } from "@/utilities/authenticateUser";
import { getJWTUser } from "@/utilities/getJWTUser";
import { Likes } from "/mongo/LikesModel";

export async function GET() {
    try {
        const blogs = await Blog.find({})
            .sort({ time: -1 })
            .populate({
                path: 'writerId',   // targeting through
                model: 'Users',       // targeting to
                select: 'name imgUrl' // field to select
            })
            .lean() //  Mongoose documents => js objects
            .exec();


        const likedById = getJWTUser()?._id;
        if (!likedById) {
            return NextResponse.json({ success: true, blogs });
        }

        const blogsWithLikes = await Promise.all(blogs.map(async (blog) => {
            const liked = await Likes.findOne({ likedToId: blog._id, likedById }).exec();
            return ({
                ...blog,
                liked: liked !== null
            });
        }));

        return NextResponse.json({ blogs: blogsWithLikes, success: true });
    } catch (error) {
        // console.log(error.message);
        return NextResponse.json({ success: false, message: error.message });
    }
}


export async function POST(req) {
    try {
        let body = await req.json();
        const isVerified = authenticateUser(body.writerId);

        if (!isVerified) {
            return NextResponse.json({}, { status: 404 });
        }

        let blog = new Blog(body);
        await blog.save();
        return NextResponse.json({ success: true, message: "your blog is posted successfylly", blog });
    } catch (error) {
        // console.error(error.message)
        return NextResponse.json({ success: false, message: error.message });
    }
}