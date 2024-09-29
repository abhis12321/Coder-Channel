import BlogFooter from './BlogFooter';
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image';
import { useAuth } from './AuthProvider';
import CopyLink from './CopyLink'
import BlogComments from './BlogComments'
import axios from 'axios';

export default function Blogs({ blog }) {
  const { user } = useAuth();
  const [option, setOption] = useState();

  const handleLikes = () => {
    const payload = {
      blogId: blog?._id,
      userId: user._id,
    }

    axios.post("/api/blogs/likes", payload)
      .then(response => response.data)
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }


  return (
    <div className='relative w-[98%] max-w-[700px] min-h-20 min-w-20 dark:ring-green-800 bg-white dark:bg-green-800/10 shadow-[0_0_2px_gray] hover:shadow-[0_0_5px_gray] rounded-lg py-1 px-3 xs:px-4 md:px-5 flex flex-col justify-evenly items-center' id={blog._id}>
      <Link href={`/students/${blog.writerId._id}`} className="w-full min-h-16 p-2 flex gap-5 items-center group border-b[1.5px] border-gray-400 mb-2">
        <Image src={blog.writerId.imgUrl || "/img/profileImg.jpg"} alt='' height={50} width={50} className='rounded-full h-[55px] w-[55px]' />
        <div className="flex flex-col justify-around">
          <div className="font-bold text-gray-700/90 dark:text-blue-200 group-hover:text-blue-700/80 group-hover:underline">{blog.writerId.name}</div>
          <div className="text-red-950/60 dark:text-gray-500/85 text-xs">{`${(new Date(blog.time)).toDateString()} ${(new Date(blog.time)).toLocaleTimeString()}`}</div>
        </div>
      </Link>

      {/* <div className='h-[1px] w-full mb-4 bg-gray-600/50 overflow-hidden' /> */}

      <div className="w-full font-mono font-extralight text-gray-700 dark:text-gray-300/85 whitespace-pre-wrap text-balance overflow-auto border-b-[1.5px] border-gray-400/80 dark:border-gray-700 pb-3 mb-1">
        {blog.blog}
      </div>

      {/* <div className='h-[1px] w-full mt-4 bg-gray-600/50 overflow-hidden' /> */}

      <BlogFooter blog={blog} setOption={setOption} handleLikes={handleLikes}/>

      {
        option === 1 ?
          <BlogComments blogId={blog._id} userId={user?._id}/>
          :
          option === 2 &&
          <CopyLink  setCopyLink={setOption} text={`http://localhost:3000/#${blog._id}`}/>
      }
    </div>
  )
}
