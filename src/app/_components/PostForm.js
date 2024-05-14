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
        <form className="flex flex-col text-white bg-gradient-to-b from-white to-slate-50 dark:from-cyan-950 dark:via-cyan-950 dark:to-cyan-950 w-[98%] max-w-[700px] rounded-lg shadow-[0_0_5px_black] hover:shadow-[0_0_8px_indigo] dark:hover:shadow-[0_0_8px_white] relative overflow-hidden" onSubmit={handleSubmit}>
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder='Write your post' cols="30" rows="10" className='bg-inherit p-2 text-center outline-none rounded' required></textarea>
            <input type="submit" value={'Post'} placeholder='Enter your subject/topic' className='bg-red-900 hover:bg-red-700 active:bg-violet-900 p-2 text-center outline-none font-bold cursor-pointer' required />
        </form>
    )
}
