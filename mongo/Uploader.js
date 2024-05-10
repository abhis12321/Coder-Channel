'use server'
import path from 'path';
import fs from 'fs/promises';
import {v4 as uuid} from 'uuid';
import os from 'os';
import cloudinary from 'cloudinary';

// const image = new mongoose.Schema({    //data model
//     url:{
//         type:String,
//     }
// })
// const Image = mongoose.models.Images || mongoose.model("Images" , image);  // constructor



cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})


export async function uploadPhotosToLocal(formData) {    
    const files = formData.getAll('files');
    // console.log(files);

    let bufferData = files.map(file => {
        return file.arrayBuffer()
            .then(data => {
                let buffer = Buffer.from(data);
                let name = uuid();
                let ext = file.type.split("/")[1];


                let tempDir = process.cwd();
                const uploadPath = path.join(tempDir, `/${name}.${ext}`);     
                // <= Works in vercel

                fs.writeFile(uploadPath , buffer);
                return {filepath:uploadPath , filename:file.name};


                

    // console.log(process.cwd());      // -> Current Working Directory
                // const uploadPath = path.join(process.cwd() , 'public' , `/${file.name}`);
                // const uploadPath = path.join(process.cwd() , 'public' , `/${name}.${ext}`);  
                // <= Doesn't Work in Vercel ->
                // let tempDir = os.tmpdir(); 
                
                // console.log(data , buffer);
                // console.log(uploadPath);
                // console.log(tempDir);
                // console.log({name , ext});
                // console.log( {filepath:uploadPath , filename:file.name} , '0');
            })
    })

    
    return await Promise.all(bufferData);
}


let weburl = "";
async function uploadToCloudinary(newFiles) {
    const URI = async() => {
        newFiles.map(async(file) => (
            await cloudinary.uploader.upload(file.filepath ,(r)=> (console.log(r.url + "<-1")) , {folder:'next_upload'})  //(path , callback , options)
            .then((result) => {
                // let URL = new Image({url:result.url});
                // await URL.save();
                
                fs.unlink(file.filepath);
                weburl += " , " + result.url;
                console.log(result.url + "<-2");
            })
            .catch(err => {
                console.log(`some error occured! ${err}`);
            })
        ))
    }

    await URI();
    console.log(weburl);

    return weburl;
}


export async function uploadPhoto(formData) {
    console.log(formData);

    try {
        weburl = '';
        const newFiles = await uploadPhotosToLocal(formData);
        const url = await uploadToCloudinary(newFiles);
        
        return {message:"done"}
        // setTimeout(() => console.log("10seconds later => " , weburl , "[]") , 10000);
        // console.log("<=-=> [" , url , ']');

        // console.log(newFiles , 'uploaded to local');
        // console.log(data);
        // console.log(formData);
    }
    catch(error) {
        return {message:error.message};
    }
}



// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
// });

// export async function uploadPhoto(formData) {
//     const files = formData.getAll('files');
//     const uploadResults = [];

//     try {
//         for (const file of files) {
//             const { buffer } = await file.arrayBuffer();
//             const ext = file.type.split('/')[1];
//             const name = uuid();
//             console.log(buffer , file);
//             const uploadResult = await cloudinary.uploader.upload(buffer, {
//                 public_id: name,
//                 folder: 'next_upload',
//                 resource_type: 'raw',
//                 overwrite: true,
//                 unique_filename: false,
//                 format: ext,
//             });
//             uploadResults.push(uploadResult.secure_url);
//         }
//         return uploadResults;
//     } catch (error) {
//         console.log(`Error uploading photos: ${error.message}`);
//     }
// }
