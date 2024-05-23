import Link from 'next/link';
import React from 'react'

export default function Followings({followings , setConnections}) {
  return (
    <div className='flex gap-[1px] flex-col items-center justify-around w-[98%] mx-[2%] max-w-[400px] bg-blue-950 p-2 fixed'>
      <div className="flex items-center justify-between w-full px-2 py-1">
        <div className="">Followings : {followings.length}</div>
        <div className="text-xl text-red-800 font-semibold px-[10px] py-[2px] cursor-pointer rounded-full ring-1 hover:ring-red-600 hover:text-red-500 duration-500" onClick={e => setConnections(0)}>X</div>
      </div>
      {
        followings?.map((user , index) => 
            <Link href={`/students/${user.followedToId}`} className="p-2 font-mono bg-blue-100/10 rounded w-full text-center hover:ring-2 hover:bg-violet-800/10 ring-violet-800" key={index}>{user.followedToName}</Link>
        ) 
      }
    </div>
  )
}
