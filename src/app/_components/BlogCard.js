import Link from 'next/link'
import React from 'react'

export default function Blogs( { blog } ) {
    // console.log(blog);
  return (
    <div className='w-[98%] max-w-[700px] min-h-20 min-w-20 bg-green-800/15 ring-1 ring-green-800 rounded-lg pt-4 pb-1 px-3 ms:px-4 flex flex-col gap-3 justify-evenly items-center'>
      <div className="font-mono text-gray-800 dark:text-gray-300">
        {blog.blog}
      </div>
      <div className="text-[10px] flex gap-2 self-end">
        <Link href={`/students/${blog.writerId}`} className="hover:underline font-bold text-blue-800 hover:text-blue-600">___{blog.writer}</Link>
        <div className="opacity-70 dark:opacity-40 font-semibold">{blog.time}</div>
      </div>
    </div>
  )
}
