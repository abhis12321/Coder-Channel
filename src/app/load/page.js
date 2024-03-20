"use client";
import React from "react";
// import Link from "next/link";
// import { uploadPhoto } from "../../../mongo/Uploader";
import { PhotoCard } from "./PhotoCard";


export default function Home() {
  const formRef = React.useRef();
  const [files , setFile] = React.useState([]);

  const inputFile = (e) => {
    let nvFiles = e.target.files;

    const newFiles = [...nvFiles].filter(file => {
      if(file.size <= 1024*1024 && file.type.startsWith('image/')) {
        return file;
      }
    })

    // console.log(nvFiles , newFiles);
    setFile(prev => [...prev , ...newFiles]);
    formRef.current.reset();
  }

  const deleteImg = index => {
    let newfiles = files.filter((file , i) => i != index);
    setFile(newfiles)
  }
  
  async function handleUploadToLocal(e) {
    e.preventDefault();
    if(!files.length) {
      alert("choose some files and then press the upload button");
      return;
    }

    const formdata = new FormData();

    files.forEach(file => {
      formdata.append('files' , file);
    })

    
    // console.log("uploading...");
    // let data = await uploadPhoto(formdata);
    // console.log(data);

    console.log("trying..");
    await fetch('/api', {
          method: "POST",
          body:formdata
      })
      .then(res => res.json())
      .then(data => console.log("data" , data));
  }

  const logIt = e => {
    console.log(files.length , files);
  }

  return (
    <div className='center'>
      {/* <Link href={`https://scholarship.up.gov.in/LoginStudentPostRenew.aspx`}>scholarship</Link> */}
      <h2>Testing to Upload images and files on cloud-storage</h2>
      <form onSubmit={handleUploadToLocal} ref={formRef}>
        <input type="file" accept="image/*" onChange={inputFile} multiple/>
        <button type="submit"> upload </button>
      </form>

      <div className="display-flex">
        {
          files.map((file , index)=> <PhotoCard key = {index} url={URL.createObjectURL(file)} deleteIt={() => deleteImg(index)}/>)
        }
      </div>


        <button onClick={logIt}>log</button>
      {/* <button onClick={uploadToCloudinary}>upload to cloudinary</button> */}
      {/* <PhotoCard url={`https://avatars.githubusercontent.com/u/134488510?s=400&u=f5616e8db4f7d23c98c892a42a1f32219191082a&v=4`} /> */}
    </div>
  )
}
