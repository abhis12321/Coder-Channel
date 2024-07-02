"use client"
import React, { useState } from 'react';
import ImageForm from './ImageForm';
import axios from 'axios';

export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('male');
    const [university, setUniversity] = useState('');
    const [course, setCourse] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [instagram, setInstagram] = useState('');
    const [github, setGithub] = useState('');
    const [image, setImage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('files', image);

        let imgUrl = await axios.post('/api/img', formdata)
            .then(response => response.data)
            .then(data => data.imgUrl)
            .catch(error => null) || "/img/profileImg.jpg";

        // console.log(imgUrl);
        axios.post(`/api/users`, { name, email, password, gender, university, course, linkedIn, instagram, github, imgUrl })
            .then(response => response.data)
            .then(data => alert(data.message))
            .catch(error => alert(error.message));
    }

    return (
        <form onSubmit={handleSubmit} className='text-violet-950 dark:text-white from-blue-50 to-blue-50 bg-gradient-to-b  dark:from-blue-900/50 dark:via-cyan-950/90 dark:to-blue-950/60 shadow-[0_0_4px_black] dark:shadow-[0_0_4px_white] w-[98%] max-w-[600px] rounded-2xl p-2 sm:p-6 pt-[10px] sm:pt-2 gap-1 flex flex-col items-center justify-center' autoComplete='on'>

            <div className={`w-full flex items-center justify-around pb-1`}>
                <h1 className="hidden sm:flex rounded-lg text-4xl font-extrabold text-center w-fit dark:text-white text-red-950">New Resistration</h1>
                <ImageForm image={image} setImage={setImage} />
            </div>
            <div className="flex flex-col xs:flex-row gap-1 xs:gap-3 w-full font-mono">
                <input name='name' type="text" value={name} onChange={e => setName(e.target.value)} className='w-full xs:flex-1 font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 placeholder:font-light placeholder:text-sm' placeholder='Enter your name' required />

                <select name="status" id="" className="w-full xs:w-fit font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center ring-1 focus:ring-2 ring-cyan-500" placeholder='pending' value={gender} onChange={(e) => setGender(e.target.value)} >
                    <option value="male" className='bg-slate-950/30'>male</option>
                    <option value="female" className='bg-slate-950/30'>female</option>
                    <option value="others" className='bg-slate-950/30'>others</option>
                </select>
            </div>
            <input name='email' type="email" value={email} onChange={e => setEmail(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='Enter your email' required />
            <input name='password' type="password" value={password} onChange={e => setPassword(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='Enter password' required />
            <input name='university' type="text" value={university} onChange={e => setUniversity(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='your university name' required />
            <input name='course' type="text" value={course} onChange={e => setCourse(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='your course' required />
            <input name='linkedIn' type="text" value={linkedIn} onChange={e => setLinkedIn(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='your linked profile' />
            <input name='instagram' type="text" value={instagram} onChange={e => setInstagram(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='your instagram profile' />
            <input name='github' type="text" value={github} onChange={e => setGithub(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='your github profile' />
            <button type='submit' className='text-white w-full font-semibold ring-1 ring-cyan-950 bg-red-900 hover:bg-red-700 active:bg-violet-900 py-2 px-3 rounded-lg mx-auto text-center' >Register</button>
        </form>
    )
}
