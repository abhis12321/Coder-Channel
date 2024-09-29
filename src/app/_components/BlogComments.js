import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function BlogComments({ blogId, userId }) {
    const [comments , setComments] = useState([]);

    useEffect(() => {
        axios.get(`/api/blogs/comments/${blogId}`)
            .then(response => response.data)
            .then(data => data.comments)
            .catch(error => console.error(error.message))
    }, [blogId]);

  return (
    <div className='w-full h-20 mt-1 bg-red-500'>
      
    </div>
  )
}
