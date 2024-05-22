import React from 'react';

export default function Page({USER , setStatus}) {
    const handleLogout = e => {
        USER?.logout();
        setStatus(true);
    }
    return (
        <div className="flex items-center justify-center text-violet-950 font-semibold dark:font-normal dark:text-white">
            {USER?.user &&
                <div className="w-[98%] max-w-[500px] gap-3 flex flex-col justify-center items-center text-center rounded-xl px-2 py-4 xs:px-4 bg-gradient-to-bl from-white to-white dark:from-blue-600/20 dark:to-blue-900/20 ring-1 ring-violet-950 dark:ring-gray-300">
                    <p className='text-sm font-mono'>You are going to logout from our website</p> 
                    <span className='drop-shadow-[0_0_2px_red] font-mono'>Coder&apos;Media App&quot;</span>
                    <h5 className='text-lg font-serif font-semibold dark:font-normal'>You can login-back with your Email and Password later whenever you want</h5>
                    <p className='text-sm font-mono'>Are you sure, You wanna logout?</p>
                    <div className="w-[60%] min-w-[200px] flex items-center justify-evenly font-serif font-semibold text-sm xs:text-base">
                        <button className="text-white bg-red-800/70 hover:bg-red-600 hover:font-bold py-2 xs:py-[6px] w-[65px] rounded-lg" onClick={handleLogout}>Yes</button>
                        <button className="text-white bg-green-800/70 hover:bg-green-600 hover:font-bold py-2 xs:py-[6px] w-[65px] rounded-lg" onClick={e => setStatus(true)}>No</button>
                    </div>
                </div>
            }
        </div>
    )
}