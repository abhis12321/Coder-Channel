"use client"
import React, { useState } from 'react';
import ImageForm from './ImageForm';
import axios from 'axios';

export default function ProfileEdit({ student, setEditable }) {
    const [name, setName] = useState(student.name);
    const [email, setEmail] = useState(student.email);
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(student.gender);
    const [university, setUniversity] = useState(student.university);
    const [course, setCourse] = useState(student.course);
    const [linkedIn, setLinkedIn] = useState(student.linkedIn);
    const [instagram, setInstagram] = useState(student.instagram);
    const [github, setGithub] = useState(student.github);
    const [image, setImage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();    
        let imgUrl = "/img/profileImg.jpg";

        const formData = new FormData();
        if(image) {
            formData.append("file", image);
            formData.append("upload_preset", "my-lab");
            await axios.post(`https://api.cloudinary.com/v1_1/dak3c5zwi/upload`, formData)
                .then(res => res.data)
                .then(data => imgUrl = data.secure_url)
                .catch((error) => console.error(error.message));
        }        

        const payload = { name, email, password, gender, university, course, linkedIn, instagram, github, imgUrl };
        axios.patch(`/api/users/${student._id}`, payload)
            .then(response => response.data)
            .then(data => alert(data.message))
            .catch(error => alert(error.message));
        
            setEditable(false);
    }

    return (
        <div className="fixed top-0 left-0 z-50 h-[100vh] w-[100vw] bg-slate-950/70 flex items-center justify-center">
            <form onSubmit={handleSubmit} className='text-violet-950 dark:text-white from-blue-50 to-blue-50 bg-gradient-to-b  dark:from-green-900/50 dark:via-cyan-950/90 dark:to-blue-950/60 shadow-[0_0_4px_black] dark:shadow-[0_0_4px_white] w-[98%] max-w-[600px] rounded-2xl px-2 sm:px-4 py-[10px] gap-2 flex flex-col items-center justify-center' autoComplete='on'>
                <ImageForm image={image} setImage={setImage} initialImg={student?.imgUrl}/>
                <div className="flex flex-col xs:flex-row gap-1 xs:gap-3 w-full font-mono">
                    <input name='name' type="text" value={name} onChange={e => setName(e.target.value)} className='w-full xs:flex-1 font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 placeholder:font-light placeholder:text-sm' placeholder='Enter your name' required />

                    <select name="status" id="" className="w-full xs:w-fit font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center ring-1 focus:ring-2 ring-cyan-500" placeholder='pending' value={gender} onChange={(e) => setGender(e.target.value)} >
                        <option value="male" className='bg-slate-950/30'>male</option>
                        <option value="female" className='bg-slate-950/30'>female</option>
                        <option value="others" className='bg-slate-950/30'>others</option>
                    </select>
                </div>
                <input name='email' type="email" value={email} onChange={e => setEmail(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='Enter your email pointer-events-none' required />
                <input name='password' type="password" value={password} onChange={e => setPassword(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='Enter password' required />
                <input name='university' type="text" value={university} onChange={e => setUniversity(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='your university name' required />
                <input name='course' type="text" value={course} onChange={e => setCourse(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='your course' required />
                <input name='linkedIn' type="text" value={linkedIn} onChange={e => setLinkedIn(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='your linked profile' />
                <input name='instagram' type="text" value={instagram} onChange={e => setInstagram(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='your instagram profile' />
                <input name='github' type="text" value={github} onChange={e => setGithub(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='your github profile' />
                {/* <button type='submit' className='text-white w-full font-semibold ring-1 ring-cyan-950 bg-red-900 hover:bg-red-700 active:bg-violet-900 py-2 px-3 rounded-lg mx-auto text-center' >Update</button> */}
                <div className="flex w-full items-center justify-between gap[2px] border-[2px] border-cyan-500 dark:border-cyan-600 rounded-lg overflow-hidden">
                    <div className="w-[50%] text-white/80 bg-orange-900 hover:bg-orange-700 active:bg-violet-900 p-2 text-center outline-none font-semibold cursor-pointer border-r-[2px] border-cyan-500 dark:border-cyan-600" onClick={e => setEditable(false)}>cancel</div>
                    <input type="submit" value={'update'} className='w-[50%] text-white/80 bg-red-800 hover:bg-red-600 active:bg-violet-900 p-2 text-center outline-none font-semibold cursor-pointer' required />
                </div>
            </form>
        </div>
    )
}
