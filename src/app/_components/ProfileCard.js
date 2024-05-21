import Image from 'next/image'
import React from 'react'

export default function ProfileCard({student , setStatus}) {
  return (
    <div className='flex items-center justify-center py-4 w-full'>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-around bg-blue-700/15 p-2 md:p-4 rounded-lg w-[98%] max-w-[850px] text-white">
          <div className="w-fit flex items-center justify-center">
            <Image src='/img/profileImg.jpg' alt='profile-image' width={200} height={200} className='rounded-full h-36 w-36 sm:h-40 sm:w-40' />
          </div>

          <div className="flex flex-col gap-[10px] p-3 md:p-4 items-center sm:items-start justify-center dark:bg-slate-700/40 bg-blue-950/30 w-[100%] sm:w-[72%] sm:max-w-[700px] rounded-lg">
            <div className="flex gap-2 md:gap-4 flex-wrap items-center">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif">{student?.name}</h1>
              <button className="py-1 px-3 md:px-4 text-sm rounded bg-red-600/50 hover:bg-red-600 active:bg-violet-900 w-fit font-serif font-semibold text-gray-200" onClick={setStatus}>logout</button>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-start font-bold sm:font-semibold text-xs sm:text-sm">
              <div className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[5px] sm:py-[4px] bg-green-700/60 rounded-md hover:bg-green-600 active:bg-violet-600/30">
                <button className="text-gray-50 dark:text-gray-200">{student?.likes}</button>
                <button className="">Likes</button>
              </div>
              <div className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[5px] sm:py-[4px] bg-green-700/60 rounded-md hover:bg-green-600 active:bg-violet-600/30" >
                <button className="text-gray-50 dark:text-gray-200">{student?.followers}</button>
                <button className="">Followers</button>
              </div>
              <div className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[5px] sm:py-[4px] bg-green-700/60 rounded-md hover:bg-green-600 active:bg-violet-600/30" >
                <button className="text-gray-50 dark:text-gray-200">{student?.followings}</button>
                <button className="">Following</button>
              </div>
            </div>

            <div className="flex flex-col font-mono items-center sm:items-start">
              <div className="flex gap-[5px] items-start">
                <h1 className="opacity-60 w-fit">course : </h1>
                <h1 className="flex-1">{student?.course}</h1>
              </div>
              <div className="flex gap-[5px] items-start">
                <h1 className="opacity-60 w-fit">university : </h1>
                <h1 className="flex-1">{student?.university}</h1>
              </div>
            </div>
          </div>
        </div>
    </div>

  )
}
