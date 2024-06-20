"use client"
import React, { useState } from 'react'
import { useAuth } from './AuthProvider';
import axios from 'axios';

export default function Page({setPostForm}) {
    const [blog, setBlog] = useState('');
    const USER = useAuth();

    const handleSubmit = e => {
        e.preventDefault();
        console.log(blog , USER?.user?.name);

        axios.post('/api/blogs' , {writer:USER?.user?.name , writerId:USER?.user?._id , blog});

        setBlog('');
        setPostForm(false)
    }

    return (
        <form className="flex flex-col text-violet-950 dark:text-white bg-white dark:bg-blue-900/15 dark:focus-within:bg-blue-900/10 w-[98%] xs:w-[80%] sm:w-[65%] max-w-[600px] rounded-lg ring-1 focus-within:ring-2 ring-cyan-950 dark:ring-sky-600 relative overflow-hidden" onSubmit={handleSubmit}>
            <textarea value={blog} onChange={e => setBlog(e.target.value)} placeholder='Write your post/blog' cols="30" rows="9" className='bg-transparent m-3 p-1 outline-none rounded' required></textarea>
            <input type="submit" value={'Post'} placeholder='Enter your subject/topic' className='text-white bg-red-900 hover:bg-red-700 active:bg-violet-900 p-2 text-center outline-none font-bold cursor-pointer border-t-[2px] border-cyan-950 dark:border-sky-600' required />
        </form>
    )
}
