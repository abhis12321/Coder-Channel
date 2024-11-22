import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CopyLink from './CopyLink';
import LoginForm from './LoginForm';
import BlogFooter from './BlogFooter';
import { useAuth } from './AuthProvider';
import BlogComments from './BlogComments';
import BlogLikesPage from './BlogLikesPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import BlogEditForm from './BlogEditForm';

export default function BlogCard({ blog, loadBlogs, handleBlogDelete, handleBlogEdit }) {
  const { user } = useAuth();
  const [option, setOption] = useState();
  const [comments, setComments] = useState([]);
  const [allLikes, setAllLikes] = useState([]);

  const handleLikes = () => {
    if (!user) {
      setOption(4);
    } else {
      const payload = { blogId: blog?._id, userId: user?._id }
      axios.post("/api/blogs/likes", payload)
        .then(() => loadBlogs())
        .catch(error => console.error(error))
        .finally(() => loadLikes());
    }
  }

  const loadLikes = () => {
    axios.get(`/api/blogs/likes/${blog?._id}`)
      .then(response => response.data)
      .then(data => data.AllLikes)
      .then(AllLikes => setAllLikes(AllLikes))
      .catch(error => console.error(error.message))
  }

  const loadComments = () => {
    axios.get(`/api/blogs/comments/${blog?._id}`)
      .then(response => response.data)
      .then(data => data.comments)
      .then(comments => setComments(comments))
      .catch(error => console.error(error.message))
  }

  useEffect(() => {
    loadLikes();
    loadComments();
  }, [blog?._id]);

  return (
    <div className='relative w-[98%] max-w-[700px] min-h-20 min-w-20 bg-white dark:bg-gray-800/95 shadow-[0_0_2px_gray] hover:shadow-[0_0_5px_gray] rounded-lg py-1 px-3 xs:px-4 md:px-5 flex flex-col justify-between items-center pb-[2.1px]' id={blog?._id}>

      <div className="w-full flex justify-between items-center">
        <Link href={`/students/${blog.writerId._id}`} className="min-h-16 p-2 flex gap-5 items-center group border-b[1.5px] border-gray-400 mb-2">
          <Image src={blog.writerId.imgUrl || "/img/profileImg.jpg"} alt='' height={50} width={50} className='rounded-full h-[50px] w-[50px] shadow-[0_0_1.5px_gray]' />
          <div className="flex flex-col justify-around">
            <div className="font-bold text-gray-700/90 dark:text-blue-200 group-hover:text-blue-700/80 group-hover:underline">{blog.writerId.name} <span className='opacity-50'>{blog.writerId._id == user?._id && "(You)"}</span></div>
            <div className="text-red-950/60 dark:text-gray-500/85 text-xs">{`${(new Date(blog.time)).toDateString()} ${(new Date(blog.time)).toLocaleTimeString()}`}</div>
          </div>
        </Link>
        {
          handleBlogDelete && handleBlogEdit &&
          <div className="relative cursor-pointer">
            <FontAwesomeIcon size='sm' icon={faEllipsisVertical} className={`h-5 px-3 hover:text-blue-600 ${option === 10 && "rotate-90"} duration-300`} onClick={() => setOption(prev => prev == 10 ? 0 : 10)} />
            {
              option === 10 &&
              <div className='absolute top-[24px] left-[-2.2px] flex flex-col gap-[6px] items-start text-xs font-bold' onClick={() => setOption(0)}>
                <button className='text-green-700 hover:bg-green-700/20 py-[2px] px-2 rounded-lg' onClick={(e) => { e.stopPropagation(); setOption(11); }}>edit</button>
                <button className='text-red-700 hover:bg-red-700/20 py-[2px] px-2 rounded-lg' onClick={handleBlogDelete}>delete</button>
              </div>
            }
          </div>
        }
      </div>


      <div className="w-full font-mono font-extralight text-gray-700 dark:text-gray-300/85 whitespace-pre-wrap text-balance overflow-auto">
        {blog.blog}
      </div>

      <div className="w-full px-[10%] flex items-center justify-between border-b-[1.5px] border-gray-400/80 dark:border-gray-700 my-[2px]">
        <button className="font-semibold text-xs text-green-700 hover:underline hover:text-green-600 active:text-violet-700" onClick={() => setOption(3)}>Likes : {allLikes?.length}</button>
        <button className="font-semibold text-xs text-green-700 hover:underline hover:text-green-600 active:text-violet-700" onClick={() => setOption(prev => prev === 1 ? 0 : 1)}>Comments : {comments?.length}</button>
      </div>


      <BlogFooter blog={blog} option={option} setOption={setOption} handleLikes={handleLikes} />

      {
        option === 1 ?
          <BlogComments blogId={blog._id} userId={user?._id} setOption={setOption} comments={comments} loadComments={loadComments} />
          :
          option === 2 ?
            <CopyLink setCopyLink={setOption} text={`http://13.201.72.123/${blog._id}`} />
            : option === 3 ?
              <BlogLikesPage setOption={setOption} allLikes={allLikes} />
              : (option === 4 && !user) ? <div className="min-h-screen w-full fixed z-10 top-0 left-0 flex items-center justify-center bg-slate-500/50 dark:bg-slate-900/90"><LoginForm /></div>
                :
                (option === 11) && <BlogEditForm handleBlogEdit={handleBlogEdit} oldBlog={blog} cancelForm={() => setOption(0)} />
      }
    </div>
  )
}
