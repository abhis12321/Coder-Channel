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


// const output = fs.createWriteStream(path.join('/tmp', 'docs.zip'));

export async function POST(request, response) {
  try {
    const formData = await request.formData();
    const newFiles = await uploadPhotosToLocal(formData);
    const url = await uploadToCloudinary(newFiles);

    return NextResponse.json({ message: 'done', url });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

async function uploadPhotosToLocal(formData) {
// const output = fs.createWriteStream(path.join('/tmp', 'docs.zip'));
  const files = formData.getAll('files');
  const bufferData = files.map(async (file) => {
    const data = await file.arrayBuffer();
    const buffer = Buffer.from(data);
    const name = uuid();
    const ext = file.type.split('/')[1];
    const tempDir = process.cwd();
    // const tempDir = '/tmp';
    const uploadPath = path.join(tempDir, `/${name}.${ext}`);
    let img = await fs.writeFile(uploadPath, buffer);
    console.log(img , `uploadPath/${name}.${ext}`);
    return { filepath: uploadPath, filename: file.name };
  });

  return Promise.all(bufferData);
}

async function uploadToCloudinary(newFiles) {
  const urls = await Promise.all(
    newFiles.map(async (file) => {
      try {
        const result = await cloudinary.uploader.upload(file.filepath , {folder:'next_upload'});
        fs.unlink(file.filepath);
        return result.url;
      } catch (err) {
        return err.message;
      }
    })
  );

  return urls;
//   return urls.filter((url) => url !== null);
}

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
  

// 'use server'
// import path from 'path';
// import fs from 'fs/promises';
// import {v4 as uuid} from 'uuid';
// import cloudinary from 'cloudinary';
// import { NextResponse } from 'next/server';


// cloudinary.config({
//     cloud_name:process.env.CLOUD_NAME,
//     api_key:process.env.API_KEY,
//     api_secret:process.env.API_SECRET,
// })


// let weburl = "";
// export async function POST(request , response) {
//     let formData = await request.formData();
//     console.log("fromdata is " , formData);

//     try {
//         weburl = '';
//         const newFiles = await uploadPhotosToLocal(formData);
//         const url = await uploadToCloudinary(newFiles);
        
//         return NextResponse.json({message:"done" , url})
//     }
//     catch(error) {
//         return NextResponse.json({message:error.message});
//     }
// }


// async function uploadPhotosToLocal(formData) {    
//     const files = formData.getAll('files');
//     // console.log(files);

//     let bufferData = files.map(file => {
//         return file.arrayBuffer()
//             .then(data => {
//                 let buffer = Buffer.from(data);
//                 let name = uuid();
//                 let ext = file.type.split("/")[1];

//                 let tempDir = process.cwd();
//                 const uploadPath = path.join(tempDir, `/${name}.${ext}`);     

//                 fs.writeFile(uploadPath , buffer);
//                 return {filepath:uploadPath , filename:file.name};

//             })
//     })

    
//     return await Promise.all(bufferData);
// }


// async function uploadToCloudinary(newFiles) {
//     const URI = async() => {
//         newFiles.map(async(file) => (
//             await cloudinary.uploader.upload(file.filepath ,(r)=> (console.log(r.url + "<-1")) , {folder:'next_upload'})  //(path , callback , options)
//             .then((result) => {
//                 fs.unlink(file.filepath);
//                 weburl += " , " + result.url;
//                 console.log(result.url + "<-2");
//             })
//             .catch(err => {
//                 console.log(`some error occured! ${err}`);
//             })
//         ))
//     }

//     await URI();
//     console.log(weburl);

//     return weburl;
// }

