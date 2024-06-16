import Link from 'next/link';
import React from 'react'

export default function Followings({followings , setConnections}) {
  // const handleUnFollow = () => {
  // }

  return (
    <div className='flex gap-[1px] flex-col items-center justify-around w-[98%] mx-[2%] max-w-[400px] bg-white dark:bg-blue-950 p-2 fixed'>
      <div className="flex items-center justify-between w-full px-2 py-[6px]">
        <div className="">Followings : {followings.length}</div>
        <div className="text-xl text-red-800 font-semibold px-[10px] py-[2px] cursor-pointer rounded-full ring-1 hover:ring-red-600 hover:text-red-500 duration-500" onClick={e => setConnections(0)}>X</div>
      </div>
      {
        followings?.map((user , index) => 
          <div className="flex justify-between items-center p-2 font-mono bg-blue-400/20 rounded w-full hover:bg-green-400/20 text-red-950 dark:text-white"  key={index}>
            <Link href={`/students/${user.followedToId}`} className="flex-1 font-bold">{user.followedToName}</Link>
            {/* <button className="py-1 w-[70px] text-center rounded bg-red-950/50 hover:bg-red-600" onClick={handleUnFollow}>unfollow</button> */}
          </div>
        ) 
      }
    </div>
  )
}
