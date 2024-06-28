import Link from 'next/link';
import React from 'react'

export default function Followers({ followers, setConnections }) {
  return (
    <div className="fixed z-10 top-0 left-0 w-[100%] h-[100%] bg-blue-100/10 flex items-center justify-center">
      <div className='ring-1 flex gap-[1px] flex-col items-center justify-around w-[98%] mx-[2%] max-w-[400px] bg-white dark:bg-blue-950 p-2 rounded'>
        <div className="flex items-center justify-between w-full px-2 py-[6px]">
          <div className="">Followers : {followers.length}</div>
          <div className="text-xl text-red-800 font-semibold px-[10px] py-[2px] cursor-pointer hover:text-red-500 hover:ring-red-700 rounded-full ring-1 duration-500" onClick={e => setConnections(0)}>X</div>
        </div>
        {
          followers?.map((user, index) =>
            <Link href={`/students/${user.followedById}`} className="flex justify-between items-center p-2 font-mono bg-blue-400/20 rounded w-full hover:bg-green-400/20 text-red-950 dark:text-white" key={index}>{user.followedByName}</Link>
          )
        }
      </div>
    </div>
  )
}
