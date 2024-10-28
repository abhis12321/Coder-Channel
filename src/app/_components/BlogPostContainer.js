"use client"
import { useState } from 'react'
import BlogPost from './BlogForm'
import LoginForm from './LoginForm'
import { useAuth } from './AuthProvider'

export default function BlogPostContainer({ handleBlogPost }) {
  const { user } = useAuth();
  const [blogForm, setBlogPost] = useState(false);

  return (
    <>

      {
        blogForm ?
          user ?
            <BlogPost setBlogPost={setBlogPost} handleBlogPost={handleBlogPost} />
            :
            <div className="fixed top-0 left-0 z-[50] w-full h-[100vh] flex items-center justify-center bg-blue-50 dark:bg-slate-950">
              <LoginForm />
            </div>
          :
          <h1 className="w-[98%] max-w-[310px] text-center py-2 px-6 text-blue-700 hover:text-white bg-blue-700/20 hover:bg-blue-900/70 ring-1 ring-blue-700 hover:ring-blue-900/70 rounded-xl cursor-pointer outline-none font-semibold duration-300" onClick={e => setBlogPost(true)}>write a new post/blog</h1>
      }


    </>
  )
}
