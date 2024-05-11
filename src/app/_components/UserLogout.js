import React from 'react';

export default function Page({USER , setStatus}) {
    const handleLogout = e => {
        USER?.logout();
        setStatus(true);
    }
    return (
        <div className="flex items-center justify-center 3 text-white">
            {USER?.user &&
                <div className="w-[95%] max-w-[800px] h-[40vh] flex flex-col justify-center items-center rounded-xl p-3 bg-gradient-to-tr from-gray-900/40 via-cyan-950/70 to-gray-950/40 dark:from-slate-900 dark:via-cyan-950 dark:to-slate-950 shadow-[0_0_8px_red]">
                    <p>You are going to logout from our website</p> 
                    <span className='drop-shadow-[0_0_2px_red]'>Student&apos;Media App&quot;</span>
                    <h5 className='mb-4 text-center text-lg font-semibold'>You can login-back with your Email and Password later whenever you want</h5>
                    <p>Are you sure, You wanna logout ?</p>
                    <div className="w-[60%] min-w-[180px] m-2 flex items-center justify-evenly font-semibold">
                        <button className="bg-red-800 hover:bg-red-600 hover:shadow-[0_0_5px_white] hover:font-bold py-2 px-6 rounded-lg" onClick={handleLogout}>Yes</button>
                        <button className="bg-green-800 hover:bg-green-600 hover:shadow-[0_0_5px_white] hover:font-bold py-2 px-6 rounded-lg" onClick={e => setStatus(true)}>No</button>
                    </div>
                </div>
            }
        </div>
    )
}