import axios from 'axios'
import { useEffect, useState } from 'react'
import BlogCommentForm from "./BlogCommentForm"
import CommentCard from './CommentCard'


export default function BlogComments({ blogId, userId, setOption }) {
    const [comments, setComments] = useState([]);
    const loadComments = () => {
        axios.get(`/api/blogs/comments/${blogId}`)
            .then(response => response.data)
            .then(data => data.comments)
            // .then(comments => console.log(comments))
            .then(comments => setComments(comments))
            .catch(error => console.error(error.message))
    }
    
    const handleDeleteComment = (_id) => {
        axios.delete(`/api/blogs/comments/${_id}`)
            .then(res => res.data)
            .then(data => data.message)
            .then(message => alert(message))
            .then(() => loadComments())
            .catch(error => alert(error.message))
    }

    const handleEditComment = (_id , comment) => {
        axios.put(`/api/blogs/comments/${_id}` , { comment })
            .then(res => res.data)
            .then(data => data.message)
            .then(message => alert(message))
            .then(() => loadComments())
            .catch(error => alert(error.message))        
    }
    
    useEffect(() => {
        loadComments();
    }, [blogId]);


    return (
        <div className='w-full min-h-20 mt-[3px] mb-4 rounded flex flex-col gap-3'>
            <BlogCommentForm commentById={userId} commentToId={blogId} loadComments={loadComments} setOption={setOption} />
            {
                comments.map(comment => <CommentCard key={comment._id} comment={comment} handleDeleteComment={handleDeleteComment} handleEditComment={handleEditComment} setOption={setOption} />
                )
            }
        </div>
    )
}
