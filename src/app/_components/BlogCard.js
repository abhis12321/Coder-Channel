import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import CopyLink from './CopyLink';
import LoginForm from './LoginForm';
import BlogFooter from './BlogFooter';
import { useAuth } from './AuthProvider';
import BlogComments from './BlogComments';
import BlogLikesPage from './BlogLikesPage';

export default function Blogs({ blog, loadBlogs }) {
  const { user } = useAuth();
  const [option, setOption] = useState();

  const handleLikes = () => {
    if (!user) {
      setOption(4);
    } else {
      const payload = { blogId: blog?._id, userId: user?._id }
      axios.post("/api/blogs/likes", payload)
        .then(() => loadBlogs())
        .catch(error => console.error(error));
    }
  }


  return (
    <div className='relative w-[98%] max-w-[700px] min-h-20 min-w-20 dark:ring-green-800 bg-white dark:bg-blue-700/5 shadow-[0_0_2px_gray] hover:shadow-[0_0_5px_gray] rounded-lg py-1 px-3 xs:px-4 md:px-5 flex flex-col justify-between items-center pb-[2.1px]' id={blog._id}>
      <Link href={`/students/${blog.writerId._id}`} className="w-full min-h-16 p-2 flex gap-5 items-center group border-b[1.5px] border-gray-400 mb-2">
        <Image src={blog.writerId.imgUrl || "/img/profileImg.jpg"} alt='' height={50} width={50} className='rounded-full h-[55px] w-[55px]' />
        <div className="flex flex-col justify-around">
          <div className="font-bold text-gray-700/90 dark:text-blue-200 group-hover:text-blue-700/80 group-hover:underline">{blog.writerId.name}</div>
          <div className="text-red-950/60 dark:text-gray-500/85 text-xs">{`${(new Date(blog.time)).toDateString()} ${(new Date(blog.time)).toLocaleTimeString()}`}</div>
        </div>
      </Link>


      <div className="w-full font-mono font-extralight text-gray-700 dark:text-gray-300/85 whitespace-pre-wrap text-balance overflow-auto border-b-[1.5px] border-gray-400/80 dark:border-gray-700 pb-3 mt-[2px]">
        {blog.blog}
      </div>


      <BlogFooter blog={blog} setOption={setOption} handleLikes={handleLikes} />

      {
        option === 1 ?
          <BlogComments blogId={blog._id} userId={user?._id} setOption={setOption} />
          :
          option === 2 ?
            <CopyLink setCopyLink={setOption} text={`http://13.201.72.123/students/#${blog._id}`} />
            : option === 3 ?
              <BlogLikesPage setOption={setOption} _id={blog._id}/>
              : (option === 4 && !user) && <div className="min-h-screen w-full fixed z-10 top-0 left-0 flex items-center justify-center bg-slate-500/50 dark:bg-slate-900/90"><LoginForm /></div>
      }
    </div>
  )
}
