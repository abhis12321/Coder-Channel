import Link from 'next/link';
import React from 'react'

export default function Followings({ followings, setConnections,handleUnFollow }) {
  return (
    <div className="fixed z-10 top-0 left-0 w-[100%] h-[100%] bg-gray-500/45 dark:bg-blue-50/25 flex items-center justify-center">
      <div className='flex gap-[1px] flex-col items-center justify-around w-[98%] mx-[2%] max-w-[400px] bg-white dark:bg-blue-950/95 p-2 ring-1 ring-blue-700 rounded'>
        <div className="flex items-center justify-between w-full px-2 pb-[6px]">
          <div className="">Followings : {followings.length}</div>
          <div className="text-xl text-red-800 font-semibold px-[10px] py-[2px] cursor-pointer rounded-full ring-1 hover:ring-red-600 hover:text-red-500 hover:bg-red-500/20 duration-500" onClick={e => setConnections(0)}>X</div>
        </div>
        {
          (followings && followings.length > 0) ?
          followings.map((user, index) =>
            <div className="flex justify-between items-center font-mono bg-blue-900/20 dark:bg-blue-400/20 hover:bg-blue-800/25 rounded w-full text-red-950 dark:text-white overflow-hidden" key={index}>
              <Link href={`/students/${user.followedToId}`} className="flex-1 font-bold py-2 px-3 hover:bg-green-900/40">{user.followedToName}</Link>
              { handleUnFollow && <button className="text-sm text-white p-[10px] bg-gray-900/70 hover:bg-gray-900" onClick={e => handleUnFollow(user._id)}>unfollow</button> }
            </div>
          )
          :
          <p className="text-gray-500">No followings till now</p>
        }
      </div>
    </div>
  )
}
