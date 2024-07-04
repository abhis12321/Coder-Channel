"use client"
import axios from 'axios';
import Image from 'next/image';
import React from 'react'

export default function ImageForm() {
    const [images, setImage] = React.useState([]);

    const handleSelect = e => {
        let files = [...e.target.files];
        let newfiles = files.filter(file => file.size <= 1025 * 1025);
        setImage(prev => [...prev, ...newfiles]);
    }

    const handleSubmit = e => {
        e.preventDefault();   
        const formdata = new FormData();

        for(let image in images) {
            formdata.append('images', images[image]);
        }

        axios.post('/api/uploadToCloudinary' , formdata)
            .then(response => response.data)
            .then(data => console.log(data))
            .catch(error => console.log(error.message));
        
        console.log(images);
    }

    return (
        <form className='flex flex-col gap-1 items-center justify-center rounded-md px-2 py-8 bg-blue-200' onSubmit={handleSubmit}>
            <input type="file" accept="image/*" className="w-fit max-fit h-fit text-red-950 text-center text-xs font-bold outline-none" placeholder="" onChange={handleSelect} multiple required />


            <div className="flex flex-wrap gap-4 justify-center items-center p-4 w-full">
                {
                    images.map((image, index) =>
                        <Image key={index} src={image ? URL.createObjectURL(image) : "/img/profileImg.jpg"} alt='image' width={150} height={150} className='h-48 w-fit ring-1 ring-white rounded bg-white' />
                    )
                }
            </div>
            <input type="submit" value="upload" className='text-white w-fit text-sm font-semibold font-serif ring-1 ring-cyan-950 bg-red-900 hover:bg-red-700 active:bg-violet-900 py-1 px-4 rounded-lg mx-auto text-center' />
        </form>
    )
}
