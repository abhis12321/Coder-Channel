"use client"
import React, { useEffect, useState } from 'react'
import BlogPost from './_components/BlogForm'
import BlogCard from './_components/BlogCard'
import axios from 'axios'
import LoginForm from './_components/LoginForm'
import { useAuth } from './_components/AuthProvider'

export default function Page() {
  const [blogForm, setBlogFost] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get('/api/blogs')
      .then(response => response.data)
      .then(data => data.success && setBlogs(data.blogs))
      .catch(error => console.log("error", error.message));
  }, []);

  const handleBlogPost = newblog => {
    setBlogs([...blogs, newblog]);
  }

  return (
    <div className='flex flex-col gap-3 items-center justify-center h-nav py-4'>
      {
        blogForm ?
          user ?
            <BlogPost setBlogFost={setBlogFost} handleBlogPost={handleBlogPost} />
            :
            <div className="fixed top-0 left-0 z-[50] w-full h-[100vh] flex items-center justify-center bg-blue-50 dark:bg-slate-950">
              <LoginForm />
            </div>
          :
          <h1 className="py-2 px-6 text-red-950 hover:text-white dark:text-blue-600 dark:hover:text-white bg-red-950/20 hover:bg-red-950 dark:bg-blue-600/20 dark:hover:bg-blue-600/50 ring-1 ring-red-950 dark:ring-blue-600 dark:hover:ring-blue-600/50 rounded-xl cursor-pointer outline-none font-semibold duration-300" onClick={e => setBlogFost(true)}>write a new post/blog</h1>
      }


      <div className="w-full flex flex-col gap-3 items-center justify-evenly">
        {
          blogs.map((blog, index) => <BlogCard key={index} blog={blog} />)
        }
      </div>

      {/* <div onClick={e => console.log(blogs)} className='p-2 ring-2'>log</div> */}
    </div>
  )
}
