// import { NextResponse } from "next/server";
// import User from "/mongo/UserModel";
// import Blogs from "/mongo/BlogModel";
// import { BlogLikes } from "/mongo/BlogLikesModel";
// import mongoose from "mongoose";
// import { cookies } from 'next/headers';

// export async function GET() {
//   try {
//     // await User.updateMany(
//     //   { verify: true },
//     //   { $set: { isOnline: 0 } }
//     // );

//     const blogs = await getBlogsWithUserLikes("663d70c3df20b6ad463f8afa");
//     // console.log(blogs)

//     return NextResponse.json({ success:true , blogs })
//   } catch(error) {
//     return NextResponse.json(error);
//   }
// }

// export async function POST(req) {
//   try {
//     let userId = await req.json();
//     userId = userId?._id || "663d70c3df20b6ad463f8afa";
    
//     const users = await User.aggregate([
//       {
//         $lookup: {
//           from: 'followers',
//           let: { userId: '$_id' },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ['$followedToId', '$$userId'] },
//                     { $eq: ['$followedById', new mongoose.Types.ObjectId(userId)] }
//                   ]
//                 }
//               }
//             },
//             { $limit: 1 }
//           ],
//           as: 'followStatus'
//         }
//       },
//       {
//         $addFields: {
//           isFollowing: { $gt: [{ $size: '$followStatus' }, 0] }
//         }
//       },
//       {
//         $project: {
//           followStatus: 0,
//           password: 0 // exclude password field
//         }
//       }
//     ]);

//     return NextResponse.json({ success: true, users });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message });
//   }
// }

// export async function PUT(req) {
//   try {
//       let { theme } = await req.json();
//       cookies().set("theme" , theme);
//       return NextResponse.json({ success:true , message:"theme updated." });
//   } catch(error) {
//       return NextResponse.json({ success:false , message:error.message });
//   }
// }


// const getBlogsWithUserLikes = async (userId) => {
//   try {
//       // Find all blogs
//       const blogs = await Blogs.find({})
//           .populate({
//               path: 'writerId',   // Populate the writer's information
//               select: 'name imgUrl' // Only select needed fields from Users
//           })
//           .sort({time : -1})
//           .lean() // Use lean() to get plain JavaScript objects instead of Mongoose documents
//           .exec();

//       // Map over blogs and check if the user has liked each blog
//       const blogsWithLikes = await Promise.all(blogs.map(async (blog) => {
//           const liked = await BlogLikes.findOne({
//               blogId: blog._id,
//               userId,
//           }).exec();

//           return {
//               ...blog,
//               liked: liked !== null // true if the user has liked this blog, otherwise false
//           };
//       }));

//       return blogsWithLikes; // Return the blogs with like status
//   } catch (error) {
//       console.error('Error fetching blogs:', error);
//       return [];
//   }
// };