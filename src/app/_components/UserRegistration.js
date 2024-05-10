"use client"
import React, { useState } from 'react';

export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('male');
    const [university, setUniversity] = useState('');
    const [course, setCourse] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [instagram, setInstagram] = useState('');
    const [github, setGithub] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        let info = await fetch(`/api/gverify`, {
                method: "post",
                body: JSON.stringify({name , email , password , gender , university , course , linkedIn , instagram , github}),
            })
            .then(res => res.json());

        console.log(name , email , password , gender , university , course , linkedIn , instagram , github);
        alert(info.message)
    }

    return (
        <form onSubmit={handleSubmit} className='text-white bg-gradient-to-r from-indigo-900 via-cyan-950 to-indigo-950 w-[95%] max-w-[750px] rounded-2xl py-7 flex flex-col gap-1 items-center justify-center' autoComplete='on'>
            <h1 className="hidden sm:block mx-auto mb-4 py-4 px-8 rounded-xl text-3xl font-bold bg-teal-950 text-center w-fit shadow-[0_0_5px_white]">New Resistration</h1>
            <div className="flex flex-col xs:flex-row gap-1 xs:gap-3 w-[95%] max-w-[600px] font-mono">
                <input name='name' type="text" value={name} onChange={e => setName(e.target.value)} className='w-full xs:flex-1 font-semibold shadow-[0_0_3px_white] bg-slate-950/50 outline-none py-2 px-3 rounded-xl mx-auto text-center focus:text-cyan-700 placeholder:font-light placeholder:text-sm' placeholder='Enter your name' required />

                <select name="status" id="" className="w-full xs:w-fit font-semibold shadow-[0_0_3px_white] bg-slate-950/50 outline-none py-2 px-3 rounded-xl mx-auto text-center" placeholder='pending' value={gender} onChange={(e) => setGender(e.target.value)} >
                    <option value="male" className='bg-slate-950/30'>male</option>
                    <option value="female" className='bg-slate-950/30'>female</option>
                    <option value="others" className='bg-slate-950/30'>others</option>
                </select>
            </div>
            <input name='email' type="email" value={email} onChange={e => setEmail(e.target.value)} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950/50 outline-none py-2 px-3 rounded-xl mx-auto text-center focus:text-cyan-700 font-mono placeholder:font-light placeholder:text-sm' placeholder='Enter your email' required />
            <input name='password' type="password" value={password} onChange={e => setPassword(e.target.value)} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950/50 outline-none py-2 px-3 rounded-xl mx-auto text-center focus:text-cyan-700 font-mono placeholder:font-light placeholder:text-sm' placeholder='Enter password' required />
            <input name='university' type="text" value={university} onChange={e => setUniversity(e.target.value)} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950/50 outline-none py-2 px-3 rounded-xl mx-auto text-center focus:text-cyan-700 font-mono placeholder:font-light placeholder:text-sm' placeholder='your university name' required />
            <input name='course' type="text" value={course} onChange={e => setCourse(e.target.value)} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950/50 outline-none py-2 px-3 rounded-xl mx-auto text-center focus:text-cyan-700 font-mono placeholder:font-light placeholder:text-sm' placeholder='your course' required />
            {/* <input name='image' type="text" value={imgUrl} onChange={e => setImgUrl(e.target.value)} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950/50 outline-none py-2 px-3 rounded-xl mx-auto text-center focus:text-cyan-700 font-mono placeholder:font-light placeholder:text-sm' placeholder='Enter your image url' /> */}
            <input name='linkedIn' type="text" value={linkedIn} onChange={e => setLinkedIn(e.target.value)} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950/50 outline-none py-2 px-3 rounded-xl mx-auto text-center focus:text-cyan-700 font-mono placeholder:font-light placeholder:text-sm' placeholder='your linked profile' />
            <input name='instagram' type="text" value={instagram} onChange={e => setInstagram(e.target.value)} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950/50 outline-none py-2 px-3 rounded-xl mx-auto text-center focus:text-cyan-700 font-mono placeholder:font-light placeholder:text-sm' placeholder='your instagram profile' />
            <input name='github' type="text" value={github} onChange={e => setGithub(e.target.value)} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950/50 outline-none py-2 px-3 rounded-xl mx-auto text-center focus:text-cyan-700 font-mono placeholder:font-light placeholder:text-sm' placeholder='your github profile' />
            <button type='submit' className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-red-900 hover:bg-red-700 active:bg-violet-900 py-2 focus:bg-cyan-950 px-3 rounded-xl mx-auto text-center' >Register</button>
        </form>
    )
}
