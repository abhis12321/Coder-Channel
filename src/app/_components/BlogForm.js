"use client"
import React, { useState } from 'react'
import { useAuth } from './AuthProvider';
import axios from 'axios';

export default function Page({ setBlogFost, handleBlogPost }) {
    const [blog, setBlog] = useState('');
    const USER = useAuth();

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('/api/blogs', { writer: USER?.user?.name, writerId: USER?.user?._id, blog })
            .then(response => response.data)
            .then(data => data.success && handleBlogPost(data.blog))
            .catch(error => console.log(error.message))

        setBlog('');
        setBlogFost(false)
    }

    return (
        <div className="w-[100%] h-[100%] bg-white/60 dark:bg-gray-950/80 fixed top-0 left-0 flex items-center justify-center z-10">
            <form className="relative flex flex-col text-violet-950 dark:text-white bg-blue-100/80 dark:bg-blue-950/60 dark:focus-within:bg-blue-950/65 w-[98%] max-w-[620px] rounded-lg ring-1 focus-within:ring-2 ring-cyan-950 dark:ring-blue-600 h-fit" onSubmit={handleSubmit}>
                <div className="absolute z-20 top-[-3rem] left-[47%] text-2xl rounded-full py-1 px-[13px] ring-1 ring-red-900 hover:ring-red-600 text-red-800 hover:text-red-50 cursor-pointer bg-red-700/20 hover:bg-red-700/25" onClick={e => setBlogFost(false)}>X</div>
                <textarea value={blog} onChange={e => setBlog(e.target.value)} placeholder='Write your post/blog' cols="30" rows="10" className='bg-transparent mx-4 my-3 p-1 outline-none rounded dark:text-gray-200 placeholdertext-green-700 font-mono' required></textarea>
                <input type="submit" value={'post'} placeholder='Enter your subject/topic' className='text-white bg-red-900 hover:bg-red-700 active:bg-violet-900 p-2 text-center outline-none font-bold cursor-pointer border-t-[2px] border-cyan-950 dark:border-sky-600 rounded-md' required />
            </form>
        </div>
    )
}
