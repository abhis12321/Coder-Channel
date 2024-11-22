"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../_components/BlogCard";
import ErrorPage from "../_components/ErrorPage";
import LoadingPage from "../_components/LoadingPage";

export default function page({ params }) {
  const [blog, setBlog] = useState();
  const [error, setError] = useState(false);

  const loadBlog = () => {
    axios.get(`/api/blogs/${params.blogId}`)
      .then(res => res.data)
      .then(data => {
        if (data.success) {
          setBlog(data.blog)
        } else {
          setError(true);
        }
      })
      .catch(error => {
        setError(true);
        console.error(error.message)
      });
  }

  useEffect(() => {
    loadBlog();
  }, []);
  
  return (
    <div className="w-full h-nav flex items-center justify-center p-2">
      {
        error ? <ErrorPage />
          : !blog ?
            <LoadingPage />
            :
            <BlogCard blog={blog} loadBlogs={loadBlog} />
      }
    </div>
  )
}
