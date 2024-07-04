import cloudinary from 'cloudinary';
import { NextResponse } from 'next/server';


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    timeout: 60000
});

const cloudinaryUpload = async (files, folder) => {
    try {
        const urlsPromises = files.map(async(file) => {
            const buffer = await file.arrayBuffer();
            const bytes = Buffer.from(buffer);
    
            return new Promise(async (resolve, reject) => {
                cloudinary.v2.uploader.upload_stream({
                    resource_type: "auto",
                    folder,
                    timeout: 60000
                },
                    async (error, result) => {
                        if (error) {
                            return reject(error.message);
                        }
                        return resolve(result.secure_url);
                    }
                ).end(bytes)
            })
        })
        return await Promise.all(urlsPromises);
    } catch (error) {
        return error.message;
    }
}



export async function GET() {
    try {
        return NextResponse.json({ success: true, message: "Successful" });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}


export async function POST(request) {
    try {
        const formData = await request.formData();
        const images = formData.getAll("images");
        const urls = await cloudinaryUpload(images);    
        return NextResponse.json({ success: true, urls });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message, imgUrl: null });
    }
}