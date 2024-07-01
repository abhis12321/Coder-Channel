import path from 'path';
import fs from 'fs/promises';
import { v4 as uuid } from 'uuid';
import cloudinary from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


export async function POST(request) {
  try {
    const formData = await request.formData();
    const urls = await uploadPhotosToLocal(formData);
    // const url = await uploadToCloudinary(newFiles);
    return NextResponse.json({ success:true , imgUrl:urls[0].filepath.toString().substring(6).replace(/\\/g, "/") });
  } catch (error) {
    return NextResponse.json({ success:false , message: error.message });
  }
}

async function uploadPhotosToLocal(formData) {
  const files = formData.getAll('files');
  const bufferData = files.map(async (file) => {
    const data = await file.arrayBuffer();
    const buffer = Buffer.from(data);
    const name = uuid();
    const ext = file.type.split('/')[1];
    const tempDir = './public/img';
    const uploadPath = path.join(tempDir, `/${name}.${ext}`);
    await fs.writeFile(uploadPath, buffer);
    return { filepath: uploadPath, filename: file.name };
  });
  return Promise.all(bufferData);
}

// async function uploadToCloudinary(newFiles) {
//   const urls = await Promise.all(
//     newFiles.map(async (file) => {
//       try {
//         const result = await cloudinary.uploader.upload(file.filepath , {folder:'next_upload'});
//         fs.unlink(file.filepath);
//         return result.url;
//       } catch (err) {
//         return err.message;
//       }
//     })
//   );

//   return urls;
// //   return urls.filter((url) => url !== null);
// }

// async function uploadToCloudinary(newFiles) {
//     try {
//       const urls = await Promise.all(
//         newFiles.map(async (file) => {
//           try {
//             const result = await cloudinary.uploader.upload(file.filepath, {
//               folder: 'next_upload',
//             });
//             await fs.unlink(file.filepath); // Use await here
//             return result.url;
//           } catch (err) {
//             return err.message;
//           }
//         })
//       );
  
//       const filteredUrls = urls.filter((url) => url !== null);
//       console.log('Filtered URLs:', filteredUrls);
//       return filteredUrls;
//     } catch (error) {
//         return err.message;
//     }
//   }
  