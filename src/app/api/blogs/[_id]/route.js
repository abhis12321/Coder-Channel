import "/mongo/UserModel";
import Blog from '/mongo/BlogModel';
import { Likes } from "/mongo/LikesModel";
import { NextResponse } from "next/server";
import { Comment } from '/mongo/CommentModel';
import { getJWTUser } from '@/utilities/getJWTUser';
import { authenticateUser } from "@/utilities/authenticateUser";


export const GET = async (req, { params }) => {
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

        const likedById = params._id;
        const isVerified = authenticateUser(likedById)
        if (!isVerified) {
            return NextResponse.json({ success: true, blogs });
        }
        
        const blogsWithLikes = await Promise.all(blogs.map(async (blog) => {
            const liked = await Likes.findOne({ likedToId: blog._id, likedById }).exec();
            return {
                ...blog,
                liked: liked !== null
            };
        }));

        return NextResponse.json({ blogs: blogsWithLikes, success: true });
    } catch (error) {
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

        if (!User || !User._id) {
            return NextResponse.json({ success: true, blogs });
        }

        const blogsWithLikes = await Promise.all(blogs.map(async (blog) => {
            const liked = await Likes.findOne({ likedToId: blog._id, likedById: User._id, }).exec();

            return {
                ...blog,
                liked: liked !== null // true if the user has liked this blog, otherwise false
            };
        }));

        return NextResponse.json({ success: true, blogs: blogsWithLikes });
    } catch (error) {
        // console.log(error.message);
        return NextResponse.json({ success: false, message: error.message });
    }
}



export const PUT = async (req, { params }) => {
    try {
        const { blog } = await req.json();
        const User = getJWTUser();
        if (!User?._id) {
            return NextResponse.json({}, { status: 404 });
        }
        const myBlog = await Blog.findOne({ ...params, writerId: User._id })
        myBlog.blog = blog;
        await myBlog.save();
        return NextResponse.json({ message: "Blog modified successfully" });
    } catch (error) {
        return NextResponse.json({ message: `Error occured! ${error.message}` })
    }
}


export const DELETE = async (req, { params }) => {
    try {
        const User = getJWTUser();
        if (!User?._id) {
            return NextResponse.json({}, { status: 404 });
        }
        await Blog.findOneAndDelete({ _id: params._id, writerId: User._id })
            .then(() => Likes.deleteMany({ likedToId: params._id }))
            .then(() => Comment.deleteMany({ commentToId: params._id }))
        return NextResponse.json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.log("Error => ", error.message);
        return NextResponse.json({ message: `Error occured! ${error.message}` })
    }
}