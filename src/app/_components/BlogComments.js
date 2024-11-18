import axios from 'axios'
import BlogCommentForm from "./BlogCommentForm"
import BlogCommentCard from './BlogCommentCard'


export default function BlogComments({ blogId, userId, setOption, comments, loadComments }) {    
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
    
    return (
        <div className='w-full min-h-20 mt-[3px] mb-4 rounded flex flex-col gap-3'>
            <BlogCommentForm commentById={userId} commentToId={blogId} loadComments={loadComments} setOption={setOption} />
            <div className="text-sm font-semibold opacity-65">{comments && comments.length > 0 ? "All comments" : "No comments"}</div>
            {
                comments.map(comment => <BlogCommentCard key={comment._id} comment={comment} handleDeleteComment={handleDeleteComment} handleEditComment={handleEditComment} setOption={setOption} />
                )
            }
        </div>
    )
}
