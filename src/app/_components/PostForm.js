"use client"
import React, { useState } from 'react'

export default function Page() {
    // const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log(email, subject, message);

        // setEmail('');
        setSubject('');
        setMessage('');
    }

    return (
        <form className="flex flex-col gap-2 bg-gradient-to-tr from-slate-950 via-cyan-950 to-slate-900 bg-slate-800 w-[98%] max-w-[700px] px-2 py-5 sm:p-8 rounded-lg shadow-[0_0_5px_gray]" onSubmit={handleSubmit}>
            <h1 className='mx-auto text-center py-4 sm:px-8 text-4xl rounded-md font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 w-fit'>Make a Post</h1>

            {/* <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='example@gmail.com' className='bg-slate-900/40 focus:border-cyan-700 border-2 border-gray-700 p-2 text-center outline-none rounded' required /> */}
            <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder='Enter your subject/topic' className='bg-slate-900/40 focus:border-cyan-700 border-2 border-gray-700 p-2 text-center outline-none rounded' required />
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder='Enter your message/suggestion' cols="30" rows="10" className='bg-slate-900/40 focus:border-cyan-700 border-2 border-gray-700 p-2 text-center outline-none rounded' required></textarea>
            <input type="submit" value={'Post'} placeholder='Enter your subject/topic' className='bg-red-950 hover:bg-red-700 active:bg-violet-900 border-2 border-gray-700 p-2 text-center outline-none rounded font-bold cursor-pointer' required />
        </form>
    )
}
