import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from './AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function CommentCard({ comment , handleDeleteComment, handleEditComment }) {
    const { user } = useAuth();
    const [commentOption, setCommentOption] = useState(0);
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        handleEditComment(comment._id , e.target?.comment?.value);
        setCommentOption(0);
    }

    return (
        <div className="flex flex-col gap-1 py-1">
            <div className="flex items-center justify-between bg-blue-100/5 dark:bg-black/20 rounded-lg px-1">
                <Link href={`/students/${comment.commentById._id}`} className='min-w-[80%] flex gap-3 py-1 px-2 items-center text-sm group'>
                    <Image src={comment.commentById.imgUrl} alt='' height={50} width={50} className='h-8 w-8 rounded-full shadow-[0_0_1.5px_black]' />
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="font-semibold text-gray-500 group-hover:text-blue-700 text-[13px]">{comment.commentById.name}{user?._id == comment.commentById._id && "(You)"}</h4>
                        <div className="text-red-950/60 dark:text-gray-500/85 text-[11px]">{`${(new Date(comment.commentedAt)).toDateString()} ${(new Date(comment.commentedAt)).toLocaleTimeString()}`}</div>
                    </div>
                </Link>

                {
                    comment.commentById._id == user?._id &&
                    <div className='flex gap-[6px] items-start text-xs font-bold' >
                        <button className={`text-blue-700 active:bg-violet-800/30 hover:scale-125 px-2 pb-[3px] pt-[5px] rounded-lg ${commentOption === 2 && "bg-blue-700/20 ring-1 ring-blue-700"}`} onClick={() => setCommentOption(prev => prev == 2 ? 0 : 2)}><FontAwesomeIcon size='xs' icon={faPen} className='h-4' /></button>
                        <button className='text-red-700 active:bg-violet-800/30 hover:scale-125 px-2 pb-[3px] pt-[5px] rounded-lg' onClick={() => handleDeleteComment(comment?._id)}><FontAwesomeIcon size='xs' icon={faTrashCan} className='h-4' /></button>
                    </div>
                }
            </div>
            {
                (user?._id == comment.commentById._id && commentOption === 2) ?
                    <form className="w-full pl-10 py-0 flex flex-col md:flex-row items-end gap-[3px]" onSubmit={handleCommentSubmit}>
                        <textarea name="comment" placeholder='write your comment here...' className='appearance-none border-none resizenone w-full font-mono text-gray-600 dark:text-gray-400 text-[14px] outline-none bg-gray-500/10 focus:shadow-[0_0_2px_gray] px-2 rounded-md' defaultValue={comment.comment} rows={3} required></textarea>
                        {commentOption === 2 && <input type="submit" value="update" className='text-xs font-bold bg-blue-700/20 active:bg-violet-800 hover:ring-1 ring-blue-700 text-blue-700 px-3 py-[2px] rounded-lg cursor-pointer' />}
                    </form>
                    :
                    <p className="pl-12 font-mono text-gray-600 dark:text-gray-400 text-[13.2px]">{comment.comment}</p>
            }
        </div>
    )
}
