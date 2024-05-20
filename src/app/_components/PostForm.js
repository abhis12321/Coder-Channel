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
        <form className="flex flex-col text-violet-950 dark:text-white bg-white dark:bg-blue-900/15 w-[98%] max-w-[700px] rounded-lg ring-2 ring-cyan-950 dark:ring-sky-600 relative overflow-hidden" onSubmit={handleSubmit}>
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder='Write your post' cols="30" rows="9" className='bg-inherit p-2 text-center outline-none rounded' required></textarea>
            <input type="submit" value={'Post'} placeholder='Enter your subject/topic' className='text-white bg-red-900 hover:bg-red-700 active:bg-violet-900 p-2 text-center outline-none font-bold cursor-pointer border-t-2 border-cyan-950 dark:border-sky-600' required />
        </form>
    )
}
