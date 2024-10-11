import { NextResponse } from 'next/server';
import { UploadToCloudinary } from '../../../../mongo/Uploader';


export const POST = async(req) => {
  try {
      // const formData = await req.formData();
      // const file = formData.get('file');
      // const payload = JSON.parse(formData.get("payload"));
    
      // console.log(typeof(file) , file);
      // console.log(payload);

      // if(file) {
      //   const result = await UploadToCloudinary(file);
      //   payload.image = result ? result.secure_url : "/img/profileImg.jpg";
      // } else {
      //   payload.image = "/img/profileImg.jpg";
      // }
      return NextResponse.json({ payload:"" });
  } catch(error) {
    return NextResponse.json({ } , { status:404 })
  }
}
