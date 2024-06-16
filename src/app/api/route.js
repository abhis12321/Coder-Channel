import { NextResponse } from "next/server";
// import path from "path";
// import { writeFile } from "fs/promises";
import User from "/mongo/UserModel";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    let userId = await req.json();
    userId = userId?._id || "663d70c3df20b6ad463f8afa";
    
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'followers',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$followedToId', '$$userId'] },
                    { $eq: ['$followedById', new mongoose.Types.ObjectId(userId)] }
                  ]
                }
              }
            },
            { $limit: 1 }
          ],
          as: 'followStatus'
        }
      },
      {
        $addFields: {
          isFollowing: { $gt: [{ $size: '$followStatus' }, 0] }
        }
      },
      {
        $project: {
          followStatus: 0,
          password: 0 // exclude password field
        }
      }
    ]);

    return NextResponse.json({ success: true, users });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

// export async function GET() {
//   try {
//     let userId = '663f5dc63957e7c6b8f67084';
//     const results = await User.aggregate([
//       {
//         $match: { _id: new mongoose.Types.ObjectId(userId) }
//       },
//       {
//         $lookup: {
//           from: 'followers', // The collection to join
//           localField: '_id', // Field from the `users` collection
//           foreignField: 'followedToId', // Field from the `orders` collection
//           as: 'followStatus' // Alias for the results
//         }
//       },
//       {
//           $addFields: {
//               isFollowed: { $gt: [{ $size: '$followStatus' }, 0] }
//           }
//       },
//     ]);
//     return NextResponse.json({success:true, results});
//   } catch(error) {
//     return NextResponse.json({success:false, message:error.message});
//   }
// }

// export const POST = async (req, res) => {
//   const formData = await req.formData();
//   // console.log(formData);
//   const file = formData.get("files");

//   if (!file) {
//     return NextResponse.json({ error: "No files received." }, { status: 400 });
//   }

//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename = Date.now() + file.name.replaceAll(" ", "_");

//   // console.log(buffer , filename);
//   try {
//     await writeFile(
//       path.join(process.cwd(), "public/uploads/" + filename),
//       buffer
//     );

//     return NextResponse.json({path:"public/uploads/" + filename,  Message: "Success", status: 201 });
//   } catch (error) {
//     // console.log("Error occurred: ", error);
//     return NextResponse.json({ Message: "Failed " + error.message, status: 500 });
//   }
// };

