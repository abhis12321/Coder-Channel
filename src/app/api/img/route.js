import {v2 as cloudinary} from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get("files");
    const data = await cloudinaryUpload(image, "coder-media");
    return NextResponse.json({ success: true, imgUrl:data.url });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message , imgUrl:null });
  }
}


const cloudinaryUpload = async (file, folder) => {
  try {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise(async (resolve, reject) => {
      let uploadStream = await cloudinary.uploader.upload_stream({
        resource_type: "auto",
        folder: folder,
      },
        async (error, result) => {
          if (error) {
            return reject(error.message);
          }
          return resolve(result);
        }
      )
      uploadStream.on('error', (err) => {
        reject(err.message);
      });

      uploadStream.on('finish', () => {
        // console.log('Stream finished');
      });

      uploadStream.end(bytes);
    })

  } catch (error) {
    return error.message;
  }
}
