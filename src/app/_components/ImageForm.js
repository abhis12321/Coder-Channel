import Image from 'next/image';
import React, { useState } from 'react'

export default function ImageForm({image, setImage}) {
    // const [image, setImage] = useState();

    return (
        <div className='flex flex-col gap-1 items-center justify-center rounded-md'>
            <Image src={image ? URL.createObjectURL(image) : "/img/profileImg.jpg"} alt='image' width={150} height={150} className='h-28 w-28 ring-1 ring-white rounded-full bg-white' />
            <input type="file" accept="image/*" className="w-fit py8 max-w-[4.8rem] h-fit rounded-md text-red-950 text-center text-xs font-bold outline-none ring-1 focus:ring-2 ring-blue-500" placeholder=""  onChange={e => e.target.files.length > 0 && setImage(e.target.files[e.target.files.length - 1])} />
        </div>
    )
}
