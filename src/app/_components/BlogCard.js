import BlogFooter from './BlogFooter';
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image';
import { useAuth } from './AuthProvider';
import CopyLink from './CopyLink'

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

  const handleDislike = () => {

  }

  const handleComment = () => {
    
  }


  return (
    <div className='relative w-[98%] max-w-[700px] min-h-20 min-w-20 ring-1 ring-gray-500 dark:ring-green-800 bg-white dark:bg-green-800/10 hover:shadow-[0_0_5px_gray] rounded-lg py-1 px-3 xs:px-4 md:px-5 flex flex-col gap-1 justify-evenly items-center' id={blog._id}>
      <Link href={`/students/${blog.writerId}`} className="w-full min-h-16 px-4 py-2 rounded-lg flex gap-5 items-center group">
        <Image src={blog.userImage || "/img/profileImg.jpg"} alt='' height={50} width={50} className='rounded-full h-[55px] w-[55px]' />
        <div className="flex flex-col justify-around">
          <div className="text-lg group-hover:text-blue-700 group-hover:underline">{blog.writer}</div>
          <div className="text-red-950/60 dark:text-gray-500/85 text-xs">{`${(new Date(blog.time)).toDateString()} ${(new Date(blog.time)).toLocaleTimeString()}`}</div>
        </div>
      </Link>

      <div className='h-[1px] w-full mb-4 bg-gray-600/50 overflow-hidden' />

      <div className="w-full font-mono font-medium text-gray-700 dark:text-gray-300/90 whitespace-pre-wrap text-balance overflow-auto">
        {blog.blog}
      </div>

      <div className='h-[1px] w-full mt-4 bg-gray-600/50 overflow-hidden' />

      <BlogFooter blog={blog} setOption={setOption} handleLikes={handleLikes}/>

      {
        option === 1 ?
          "comment"
          :
          option === 2 &&
          <CopyLink  setCopyLink={setOption} text={`http://localhost:3000/#${blog._id}`}/>
      }
    </div>
  )
}
