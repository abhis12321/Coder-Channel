import { faCommentDots, faShare, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { useAuth } from './AuthProvider';

export default function BlogFooter({ blog }) {
  const { user } = useAuth();
  const handleLikes = () => {
    const payload = {
      blogId: blog?._id,
      userId: user._id,
    }

    axios.post("/api/blogs/likes", payload)
      .then(response => response.data)
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  return (
    <div className='w-[97%] flex items-center justify-around'>
      <FontAwesomeIcon size='sm' icon={faThumbsUp} className='w-1/3 h-5 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-110 hover:drop-shadow-none drop-shadow-[0_0_1px_blue] hover:text-blue-700/80' onClick={handleLikes}/>
      <FontAwesomeIcon size='sm' icon={faThumbsDown} className='w-1/3 h-5 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-110 hover:drop-shadow-none drop-shadow-[0_0_1px_blue] hover:text-blue-700/80 rotate-y-180' />
      <FontAwesomeIcon size='sm' icon={faCommentDots} className='w-1/3 h-5 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-110 hover:drop-shadow-none drop-shadow-[0_0_1px_blue] hover:text-blue-700/80' />
      <FontAwesomeIcon size='sm' icon={faShare} className='w-1/3 h-5 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-110 hover:drop-shadow-none drop-shadow-[0_0_1px_blue] hover:text-blue-700/80' />
    </div>
  )
}
