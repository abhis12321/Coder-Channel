import axios from 'axios'
import { useEffect, useState } from 'react'
import BlogCommentForm from "./BlogCommentForm"
import Link from 'next/link';
import Image from 'next/image';


export default function BlogComments({ blogId, userId }) {
    const [comments, setComments] = useState([]);

    const loadComments = () => {        
        axios.get(`/api/blogs/comments/${blogId}`)
            .then(response => response.data)
            .then(data => data.comments)
            // .then(comments => console.log(comments))
            .then(comments => setComments(comments))
            .catch(error => console.error(error.message))
    }
    useEffect(() => {
        loadComments();
    }, [blogId]);


    return (
        <div className='w-full min-h-20 mt-[3px] mb-4 rounded flex flex-col gap-3'>
            <BlogCommentForm commentById={userId} commentToId={blogId} addComments={loadComments}/>
            {
                comments.map(comment =>
                    <div className="flex flex-col gap-1 py-1" key={comment._id}>
                        <Link href={`/students/${comment.commentById._id}`} className='flex gap-3 py-1 px-2 items-center text-sm bg-blue-100/5 dark:bg-black/20 rounded-lg group'>
                            <Image src={comment.commentById.imgUrl} alt='' height={50} width={50} className='h-9 w-9 rounded-full' />
                            <div className="flex flex-col items-start justify-center">
                                <h4 className="font-semibold text-gray-500 group-hover:text-blue-700 text-[13px]">{comment.commentById.name}</h4>
                                <div className="text-red-950/60 dark:text-gray-500/85 text-[11px]">{`${(new Date(comment.commentedAt)).toDateString()} ${(new Date(comment.commentedAt)).toLocaleTimeString()}`}</div>
                            </div>
                        </Link>
                        <p className="pl-12 font-mono text-gray-600 dark:text-gray-400 text-[14px]">{comment.comment}</p>
                    </div>
                )
            }
        </div>
    )
}
