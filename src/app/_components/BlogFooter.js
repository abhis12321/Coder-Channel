import { faComment, faShare, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function BlogFooter({ blog, setOption, handleLikes }) {
  return (
    <div className='w-[97%] flex items-center justify-around'>
      <FontAwesomeIcon size='sm' icon={faThumbsUp} className='w-1/3 h-5 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-110 hover:drop-shadow-none drop-shadow-[0_0_1px_blue] hover:text-blue-700/80' onClick={handleLikes}/>
      <FontAwesomeIcon size='sm' icon={faThumbsDown} className='w-1/3 h-5 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-110 hover:drop-shadow-none drop-shadow-[0_0_1px_blue] hover:text-blue-700/80 rotate-y-180' />
      <FontAwesomeIcon size='sm' icon={faComment} className='w-1/3 h-5 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-110 hover:drop-shadow-none drop-shadow-[0_0_1px_blue] hover:text-blue-700/80' onClick={() => setOption(1)}/>
      <FontAwesomeIcon size='sm' icon={faShare} className='w-1/3 h-5 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-110 hover:drop-shadow-none drop-shadow-[0_0_1px_blue] hover:text-blue-700/80' onClick={() => setOption(2)}/>
    </div>
  )
}
