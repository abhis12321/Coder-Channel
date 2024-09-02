import { faPenClip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

export default function Blogs( { blog } ) {
  return (
    <div className='w-[98%] max-w-[700px] min-h-20 min-w-20 bg-white ring-gray-500 dark:bg-green-800/15 ring-1 dark:ring-green-800 rounded-lg pt-4 pb-[6px] px-3 xs:px-4 md:px-5 flex flex-col gap-2  justify-evenly items-center'>
      <div className="w-full font-mono text-gray-800 dark:text-gray-300/80 whitespace-pre-wrap">
        {blog.blog}
      </div>
      <div className="text-[11px] flex gap-2 self-end font-serif">
        <Link href={`/students/${blog.writerId}`} className="underline hover:scale-110 font-extrabold text-blue-800 hover:text-blue-600">{blog.writer} <FontAwesomeIcon size='sm' icon={faPenClip} className='h-[10px]' /></Link>
        <div className="text-red-950/50 dark:text-gray-700 font-bold">{`${(new Date(blog.time)).toDateString()} ${(new Date(blog.time)).toLocaleTimeString()}`}</div>
      </div>
    </div>
  )
}
