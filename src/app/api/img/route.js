import cloudinary from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  timeout: 60000
});

const cloudinaryUpload = async (file, folder) => {
  try {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise(async (resolve, reject) => {
      cloudinary.v2.uploader.upload_stream({
        resource_type: "auto",
        folder,
      },
        async (error, result) => {
          if (error) {
            return reject(error.message);
          }
          return resolve(result);
        }
      ).end(bytes)
    })

  } catch (error) {
    return error.message;
  }
}



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

export async function GET() {
  return NextResponse.json({success:true , message:"Hello jack!"})
}