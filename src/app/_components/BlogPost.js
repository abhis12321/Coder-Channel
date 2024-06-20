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
            <form className="relative flex flex-col text-violet-950 dark:text-white bg-white dark:bg-blue-600/10 dark:focus-within:bg-violet-900/10 w-[98%] xs:w-[80%] sm:w-[65%] max-w-[600px] rounded-lg ring-1 focus-within:ring-2 ring-cyan-950 dark:ring-blue-600 overflow-hidden" onSubmit={handleSubmit}>
                <div className="absolute top-1 right-1 rounded-full py-1 px-[11px] ring-1 ring-red-900 hover:ring-red-600 text-red-800 hover:text-red-50 cursor-pointer bg-red-700/15 hover:bg-red-700/25" onClick={e => setBlogFost(false)}>X</div>
                <textarea value={blog} onChange={e => setBlog(e.target.value)} placeholder='Write your post/blog' cols="30" rows="9" className='bg-transparent m-5 p-1 outline-none rounded' required></textarea>
                <input type="submit" value={'Post'} placeholder='Enter your subject/topic' className='text-white bg-red-900 hover:bg-red-700 active:bg-violet-900 p-2 text-center outline-none font-bold cursor-pointer border-t-[2px] border-cyan-950 dark:border-sky-600' required />
            </form>
    )
}
