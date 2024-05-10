"use client"
import React, { useState } from 'react'

export default function Page() {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log(email, subject, message);

        

        setSubject('');
        setMessage('');
    }

    return (
        <form className="flex flex-col text-white bg-gradient-to-t from-gray-950/60 via-teal-800/40 to-gray-950/60 dark:from-slate-950 dark:via-cyan-950 dark:to-slate-900 w-[98%] max-w-[700px] rounded-lg shadow-[0_0_5px_gray] hover:shadow-[0_0_8px_indigo] dark:hover:shadow-[0_0_8px_white] relative" onSubmit={handleSubmit}>
            {/* <h1 className='mx-auto text-center py-4 sm:px-8 text-4xl rounded-md font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-violet-600 w-fit font-sans'>Write a Post</h1> */}
            {/* <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder='Enter your subject/topic' className='bg-slate-900/40 focus:border-cyan-700 border-2 border-gray-700 p-2 text-center outline-none rounded' required /> */}
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder='Write your post' cols="30" rows="10" className='bg-inherit p-2 text-center outline-none rounded' required></textarea>
            <input type="submit" value={'Post'} placeholder='Enter your subject/topic' className='bg-red-900 hover:bg-red-700 active:bg-violet-900 p-2 text-center outline-none font-bold cursor-pointer' required />
        </form>
    )
}
