"use client"
import React, { useState } from 'react'
import PostForm from './_components/PostForm'

export default function Page() {
  const [postForm , setPostForm] = useState(false);

  return (
    <div className='flex flex-col gap-3 items-center justify-center font-semibold' style={{minHeight:"calc(100vh - 4rem"}}>
      {
        postForm ? 
        <PostForm setPostForm={setPostForm}/>
        :
        <h1 className="py-2 px-4 bg-blue-600/50 rounded-lg cursor-pointer hover:bg-blue-600/20 ring-1 hover:ring-white text-white" onClick={e => setPostForm(true)}>write a new post/blog</h1>      
      }
    </div>
  )
}
