"use client"
import axios from 'axios';
import { useState } from 'react';

export default function UserRegistration({ setOption }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('male');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOption(4);
          
        const payload = { name, email, password, gender };
        axios.post(`/api/users`, payload)
            .then(response => response.data)
            .then(data => {
                setOption(0);
                alert(data.message);
            })
            .catch(error => {
                setOption(0);
                alert(error.message);
            });
    }

    return (
        <div className="fixed top-0 left-0 z-20 h-[100vh] w-full flex items-center justify-center bg-gray-700/90">
            <form onSubmit={handleSubmit} className='text-violet-950 dark:text-white from-blue-50 to-blue-50 bg-gradient-to-b  dark:from-blue-900/50 dark:via-cyan-950/90 dark:to-blue-950/60 shadow-[0_0_4px_black] dark:shadow-[0_0_4px_white] w-[98%] max-w-[600px] rounded-2xl px-2 sm:px-6 py-[18px] gap-1 flex flex-col items-center justify-center' autoComplete='on'>
                <div className={`w-full flex items-center justify-around pb-1`}>
                    <h1 className="py-2 rounded-lg text-3xl lg:text-4xl font-extrabold text-center w-fit dark:text-white text-red-950">New Resistration</h1>
                </div>
                <div className="flex flex-col xs:flex-row gap-1 w-full font-mono">
                    <input name='name' type="text" value={name} onChange={e => setName(e.target.value)} className='w-full xs:flex-1 font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 placeholder:font-light placeholder:text-sm' placeholder='Enter your name' required />

                    <select name="status" id="" className="w-full xs:w-fit font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center ring-1 focus:ring-2 ring-cyan-500" placeholder='pending' value={gender} onChange={(e) => setGender(e.target.value)} >
                        <option value="male" className='bg-slate-950/30'>male</option>
                        <option value="female" className='bg-slate-950/30'>female</option>
                        <option value="others" className='bg-slate-950/30'>others</option>
                    </select>
                </div>
                <input name='email' type="email" value={email} onChange={e => setEmail(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='Enter your email' required />
                <input name='password' type="password" value={password} onChange={e => setPassword(e.target.value)} className='w-full font-semibold bg-blue-800/10 dark:bg-gray-200/5 outline-none py-2 px-3 rounded-lg mx-auto text-center focus:text-cyan-700 focus:bg-blue-800/30 focus:ring-2 ring-1 ring-cyan-500 font-mono placeholder:font-light placeholder:text-sm' placeholder='Enter password' required />
                <div className="flex w-full items-center justify-between gap[2px] rounded-lg overflow-hidden">
                    <div className="w-[50%] text-white/80 bg-orange-900 hover:bg-orange-700 active:bg-violet-900 py-[10px] text-center outline-none font-semibold cursor-pointer border-r-[1px] border-orange-500 dark:border-orange-600" onClick={e => setOption(0)}>cancel</div>
                    <input type="submit" value={'Register'} className='w-[50%] text-white/80 bg-red-800 hover:bg-red-600 active:bg-violet-900 py-[10px] text-center outline-none font-semibold cursor-pointer' required />
                </div>
            </form>
        </div>
    )
}
