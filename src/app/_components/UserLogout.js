import React from 'react';

export default function Page({USER , setStatus}) {
    const handleLogout = e => {
        USER?.logout();
        setStatus(true);
    }
    return (
        <div className="flex items-center justify-center text-violet-950 font-semibold dark:font-normal dark:text-white">
            {USER?.user &&
                <div className="w-[95%] max-w-[800px] h-[40vh] flex flex-col justify-center items-center rounded-xl p-3 bg-gradient-to-bl from-white to-white dark:from-blue-600/20 dark:via-cyan-900/60 dark:to-slate-900 ring-2 ring-violet-950">
                    <p>You are going to logout from our website</p> 
                    <span className='drop-shadow-[0_0_2px_red]'>Student&apos;Media App&quot;</span>
                    <h5 className='mb-4 text-center text-lg font-bold dark:font-semibold'>You can login-back with your Email and Password later whenever you want</h5>
                    <p>Are you sure, You wanna logout ?</p>
                    <div className="w-[60%] min-w-[180px] m-2 flex items-center justify-evenly font-semibold">
                        <button className="text-white bg-red-800/70 hover:bg-red-600 hover:font-bold py-2 px-6 rounded-lg" onClick={handleLogout}>Yes</button>
                        <button className="text-white bg-green-800/70 hover:bg-green-600 hover:font-bold py-2 px-6 rounded-lg" onClick={e => setStatus(true)}>No</button>
                    </div>
                </div>
            }
        </div>
    )
}