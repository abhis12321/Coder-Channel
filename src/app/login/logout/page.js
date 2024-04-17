"use client"
import React from 'react';
import Link from 'next/link';
import {useAuth} from '/mongo/AuthProvider'
import { useRouter } from 'next/navigation';

export default function Page() {
    let USER = useAuth();
    let router = useRouter();

    React.useEffect(() => {
        if(!USER?.user) {
            router.push('/login')
        }
    })
    const handleLogout = e => {
        USER.logout();
        router.push('/login')
    }


    return (
        <div className="bg-slate-950 text-white flex items-center justify-center min-h-[90.9vh]">
            {USER?.user &&
                <div className="w-[95%] max-w-[800px] h-[40vh] flex flex-col justify-center items-center rounded-xl shadow-[0_0_7px_white] p-3 bg-slate-900">
                    <p>you are going to logout from our website</p> 
                    <span className='drop-shadow-[0_0_2px_red]'>&quot;Abhishek&apos;s Students Social Media App&quot;</span>
                    <h5 className='mb-4 text-center text-lg font-semibold'>You can login-back with your Email and Password later whenever you want</h5>
                    <p>Are you sure, You wanna logout ?</p>
                    <div className="w-[60%] min-w-[180px] m-2 flex items-center justify-evenly font-semibold">
                        <button className="bg-red-800 hover:bg-red-600 hover:shadow-[0_0_5px_white] hover:font-bold py-2 px-6 rounded-lg" onClick={handleLogout}>Yes</button>
                        <Link className="bg-green-800 hover:bg-green-600 hover:shadow-[0_0_5px_white] hover:font-bold py-2 px-6 rounded-lg" href={'/login'}>No</Link>
                    </div>
                </div>
            }
        </div>
    )
}