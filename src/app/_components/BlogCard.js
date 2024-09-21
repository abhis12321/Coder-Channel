import { faPenClip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BlogFooter from './BlogFooter';
import Link from 'next/link'
import React from 'react'
import Image from 'next/image';

export default function Blogs({ blog }) {
  return (
    <div className='w-[98%] max-w-[700px] min-h-20 min-w-20 ring-1 ring-gray-500 dark:ring-green-800 bg-white dark:bg-green-800/10 dark:hover:scale-[1.004] rounded-lg pt-2 pb-1 px-3 xs:px-4 md:px-5 flex flex-col gap-1 justify-evenly items-center'>
      <Link href={`/students/${blog.writerId}`} className="w-full h-16 px-4 py-5 rounded-lg flex gap-5 items-center hover:bg-blue-600/20 hover:animate-pulse">
        <Image src={blog.userImage || "/img/profileImg.jpg"} alt='' height={50} width={50} className='rounded-full h-[55px] w-[55px]' />
        <div className="flex flex-col justify-around">
          <div className="text-lg">{blog.writer}</div>
          <div className="text-red-950/60 dark:text-gray-500/85 text-xs">{`${(new Date(blog.time)).toDateString()} ${(new Date(blog.time)).toLocaleTimeString()}`}</div>
        </div>
      </Link>
      <div className='h-[1px] w-full mb-4 bg-gray-600/50' />
      <div className="w-full font-mono font-medium text-gray-700 dark:text-gray-300/90 whitespace-pre-wrap">
        {blog.blog}
      </div>
      {/* <div className="text-[11px] flex gap-2 self-end font-serif">
        <Link href={`/students/${blog.writerId}`} className="underline hover:scale-110 font-extrabold text-blue-800 hover:text-blue-600">{blog.writer} <FontAwesomeIcon size='sm' icon={faPenClip} className='h-[10px]' /></Link>
        <div className="text-red-950/60 dark:text-gray-500/85 font-bold">{`${(new Date(blog.time)).toDateString()} ${(new Date(blog.time)).toLocaleTimeString()}`}</div>
      </div> */}
      <div className='h-[1px] w-full mt-4 bg-gray-600/50' />
      <BlogFooter />
    </div>
  )
}
