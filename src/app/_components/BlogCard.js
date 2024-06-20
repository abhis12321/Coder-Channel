import Link from 'next/link'
import React from 'react'

export default function Blogs( { blog } ) {
    // console.log(blog);
  return (
    <div className='w-[98%] max-w-[600px] min-h-20 min-w-20 bg-green-800/15 ring-1 ring-green-800 rounded-lg p-6 flex flex-col gap-3 justify-center items-center'>
      <div className="">
        {blog.blog}
      </div>
      <div className="text-[10px] flex gap-2 opacity-50">
        <Link href={`/students/${blog.writerId}`} className="hover:underline">{blog.writer}</Link>
        <div className="opacity-50">{blog.time}</div>
      </div>
    </div>
  )
}
