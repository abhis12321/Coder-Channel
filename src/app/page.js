"use client"
import React, { useEffect, useState } from 'react'
import BlogPost from './_components/BlogPost'
import axios from 'axios';

export default function Page() {
  const [postForm , setPostForm] = useState(false);
  const [blogs , setBlogs] = useState();

  useEffect(() => {
    axios.get('/api/blogs')
        .then(response => response.data)
        .then(data => data.success && setBlogs(data.blogs))
        .catch(error => console.log(error.message));
  } , []);

  return (
    <div className='flex flex-col gap-3 items-center justify-center font-semibold' style={{minHeight:"calc(100vh - 4rem"}}>
      {
        postForm ? 
        <BlogPost setPostForm={setPostForm}/>
        :
        <h1 className="py-2 px-6 text-red-950 hover:text-white dark:text-blue-600 dark:hover:text-white bg-red-950/20 hover:bg-red-950 dark:bg-blue-600/20 dark:hover:bg-blue-600/50 ring-1 ring-red-950 dark:ring-blue-600 dark:hover:ring-white rounded-xl cursor-pointer outline-none" onClick={e => setPostForm(true)}>write a new post/blog</h1>      
      }
    </div>
  )
}
