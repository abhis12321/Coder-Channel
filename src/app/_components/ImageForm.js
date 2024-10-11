import Image from 'next/image';
import React, { useState } from 'react'

export default function ImageForm({ initialImg, setImage }) {
    const [imgUrl , setImgUrl] = useState(initialImg);
    const selectImage = (e) => {
        if (e.target.files.length > 0 && e.target.files[0].size <= 1025 * 1025) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            setImage(e.target.files[0]);
            reader.onload = () => {
                setImgUrl(reader.result)
            }
        }
    }
    return (
        <div className='flex flex-col gap-1 items-center justify-center rounded-md'>
            <Image src={imgUrl ? imgUrl : "/img/profileImg.jpg"} alt='image' width={150} height={150} className='h-28 w-28 ring-1 ring-red-950 rounded-full bg-white shadow-[0_0_5px_black] dark:shadow-[0_0_5px_white]' />
            <input type="file" accept="image/*" className="w-fit max-w-[4.8rem] h-fit rounded-md text-red-950 text-center text-xs font-bold outline-none ring-1 focus:ring-2 ring-blue-500" placeholder="" onChange={ selectImage } />
        </div>
    )
}
