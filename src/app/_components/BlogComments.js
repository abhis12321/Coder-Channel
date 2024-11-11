import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import BlogCommentForm from "./BlogCommentForm"
import { useAuth } from './AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'


export default function BlogComments({ blogId, userId, setOption }) {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [editOption , setEditOption] = useState(0);
    const loadComments = () => {
        axios.get(`/api/blogs/comments/${blogId}`)
            .then(response => response.data)
            .then(data => data.comments)
            // .then(comments => console.log(comments))
            .then(comments => setComments(comments))
            .catch(error => console.error(error.message))
    }
    
    const handleDeleteComment = (_id) => {
        console.log("deleting the comment")
    }
    useEffect(() => {
        loadComments();
    }, [blogId]);


    return (
        <div className='w-full min-h-20 mt-[3px] mb-4 rounded flex flex-col gap-3'>
            <BlogCommentForm commentById={userId} commentToId={blogId} loadComments={loadComments} setOption={setOption} />
            {
                comments.map(comment =>
                    <div className="flex flex-col gap-1 py-1" key={comment._id}>
                        <div className="flex item-center justify-between">
                            <Link href={`/students/${comment.commentById._id}`} className='flex gap-3 py-1 px-2 items-center text-sm bg-blue-100/5 dark:bg-black/20 rounded-lg group'>
                                <Image src={comment.commentById.imgUrl} alt='' height={50} width={50} className='h-9 w-9 rounded-full shadow-[0_0_1.5px_gray]' />
                                <div className="flex flex-col items-start justify-center">
                                    <h4 className="font-semibold text-gray-500 group-hover:text-blue-700 text-[13px]">{comment.commentById.name}</h4>
                                    <div className="text-red-950/60 dark:text-gray-500/85 text-[11px]">{`${(new Date(comment.commentedAt)).toDateString()} ${(new Date(comment.commentedAt)).toLocaleTimeString()}`}</div>
                                </div>
                            </Link>
                            {
                                comment.commentById._id == user?._id &&
                                <div className="relative cursor-pointer">
                                    <FontAwesomeIcon size='sm' icon={faEllipsisVertical} className={`h-4 px-3 hover:text-blue-600 ${editOption === 1 && "rotate-90"} duration-300`} onClick={() => setEditOption(prev => prev == 1 ? 0 : 1)} />
                                    {
                                        editOption === 1 &&
                                        <div className='absolute top-[24px] left-[-2.2px] flex flex-col gap-[6px] items-start text-xs font-bold' >
                                            <button className='text-green-700 hover:bg-green-700/20 py-[2px] px-2 rounded-lg' onClick={() => setOption(2)}>edit</button>
                                            <button className='text-red-700 hover:bg-red-700/20 py-[2px] px-2 rounded-lg' onClick={() => handleDeleteComment(comment?._id)}>delete</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                        <p className="pl-12 font-mono text-gray-600 dark:text-gray-400 text-[14px]">{comment.comment}</p>
                    </div>
                )
            }
        </div>
    )
}
