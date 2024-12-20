"use client"
import axios from 'axios'
import { useEffect, useState } from 'react'
import BlogCard from './_components/BlogCard'
import { useAuth } from './_components/AuthProvider'
import BlogPostContainer from './_components/BlogPostContainer'

export default function Page() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);

  const loadBlogs = () => {    
    axios.get("/api/blogs")
      .then(response => response.data)
      .then(data => {
        if(data.success) {  
          setBlogs(data.blogs)
        }
      })
      .catch(error => console.log("error", error.message));
  }

  useEffect(() => {
    loadBlogs();
  }, [user]);

  const handleBlogPost = newblog => {
    setBlogs([...blogs, newblog]);
  }

  return (
    <div className='flex flex-col gap-3 items-center justify-center h-nav py-4'>
      <BlogPostContainer handleBlogPost={handleBlogPost}/>
      <div className="w-full flex flex-col gap-3 items-center justify-evenly">
        {
          blogs.map((blog, index) => <BlogCard key={index} blog={blog} loadBlogs={loadBlogs}/>)
        }
      </div>
    </div>
  )
}
