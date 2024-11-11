import { useState } from "react"

export default function BlogEditForm({ oldBlog, cancelForm, handleBlogEdit }) {
    const [blog , setBlog] = useState(oldBlog.blog);
    const handleSubmit = (e) => {
        e.preventDefault();
        handleBlogEdit(oldBlog?._id , blog);
        cancelForm();
    }

  return (
    <div className="w-[100%] h-[100%] bg-white/60 dark:bg-gray-950/80 fixed top-0 left-0 flex items-center justify-center z-10">
        <form className="relative flex flex-col text-violet-950 dark:text-white bg-blue-100/80 dark:bg-blue-950/60 dark:focus-within:bg-blue-950/65 w-[98%] max-w-[620px] rounded-lg ring-1 focus-within:ring-2 ring-cyan-950 dark:ring-blue-600 h-fit" onSubmit={handleSubmit}>
            <textarea value={blog} onChange={e => e.target.value.length < 700 && setBlog(e.target.value)} placeholder='Write your post/blog(no. of character [100, 700]' cols="30" rows="11" className='bg-transparent mx-4 my-3 p-1 outline-none rounded dark:text-gray-200 placeholdertext-green-700 font-mono' required></textarea>
            <div className="flex w-full items-center justify-between gap[2px] border-[2px] border-cyan-950 dark:border-sky-600 rounded-md overflow-hidden">
                <div className="w-[50%] text-white/80 bg-orange-900 hover:bg-orange-700 active:bg-violet-900 p-2 text-center outline-none font-semibold cursor-pointer border-r-[2px] border-cyan-950 dark:border-sky-600" onClick={cancelForm}>cancel</div>
                <input type="submit" value={'post'} placeholder='Enter your subject/topic' className='w-[50%] text-white/80 bg-red-800 hover:bg-red-600 active:bg-violet-900 p-2 text-center outline-none font-semibold cursor-pointer' required />
            </div>
        </form>
    </div>
  )
}
