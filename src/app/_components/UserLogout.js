import Link from 'next/link';
import React from 'react';
export default function UserLogout({ USER, setStatus }) {
    const handleLogout = () => {
        USER?.logout();
        setStatus(true);
    }
    return (
        <div className="h-[100vh] w-full fixed top-0 left-0 z-50 bg-red-700/20 flex items-center justify-center">
            <div className="flex items-center justify-center font-semibold dark:font-normal">
                {USER?.user &&
                    <div className="w-[98%] max-w-[500px] gap-3 flex flex-col justify-center items-center text-center rounded-xl px-2 py-4 xs:px-4 md:px-12 md:py-8 bg-white shadow-[0_0_10px_gray] text-red-950 font-semibold">
                        <p className='text-sm font-mono'>You are going to logout from our website</p>
                        <span className='drop-shadow-[0_0_2px_red] font-mono'>Coder&apos;Channel Web App&quot;</span>
                        <h5 className='text-md font-serif font-bold'>You can login-back with your Email and Password later whenever you want</h5>
                        <p className='text-sm font-mono'>Are you sure, You wanna logout?</p>
                        <div className="w-[60%] min-w-[200px] flex items-center justify-evenly font-serif font-semibold text-sm xs:text-base">
                            <Link href={'/logout'} className="text-white bg-red-800 hover:bg-red-600 hover:font-bold py-2 xs:py-[5px] w-[65px] rounded-lg" onClick={handleLogout}>Yes</Link>
                            <button className="text-white bg-green-800 hover:bg-green-600 hover:font-bold py-2 xs:py-[5px] w-[65px] rounded-lg" onClick={e => setStatus(true)}>No</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}