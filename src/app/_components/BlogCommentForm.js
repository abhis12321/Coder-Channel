import axios from 'axios'
import React from 'react'

export default function BlogCommentForm({ commentToId, commentById, addComments }) {
    const handleNewComment = (e) => {
        e.preventDefault();
        const payload = {
            commentById,
            commentToId,
            comment: e.target.comment.value,
        }

        // console.log(payload)
        axios.post("/api/blogs/comments" , payload)
            .then(res => res.data)
            .then(data => {
              alert(data.message);
              addComments();
              e.target.comment.value = "";
            })
            .catch(error => alert(`Bad request! ${error.message}`))
    }

  return (
    <form className='w-full rounded flex flex-col items-end justify-center shadow-[0_0_2px_gray] bg-white/5' onSubmit={handleNewComment}>
      <textarea name="comment" placeholder='write your comment here...' className='w-full pt-2 px-3 rounded outline-none bg-transparent' required></textarea>
      <input type="submit" value="comment" className='m-1 py-[5px] px-4 rounded-2xl cursor-pointer bg-blue-700/90 hover:bg-blue-500 active:bg-sky-700 text-white font-semibold text-xs' />
    </form>
  )
}
