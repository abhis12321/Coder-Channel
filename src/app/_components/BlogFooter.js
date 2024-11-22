import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShare, faThumbsUp as faSolidThumb } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faRegularThumb } from '@fortawesome/free-regular-svg-icons'

export default function BlogFooter({ blog, setOption, handleLikes }) {
  return (
    <div className='w-[100%] relative flex gap-[1px] items-center justify-around'>
      <div className={`w-1/3 py-[11px] rounded-sm hover:bg-gray-600/15 dark:hover:bg-white/5 cursor-pointer flex gap-4 items-center justify-center font-semibold group $ active:text-violet-600`} onClick={handleLikes} >
        {
          blog?.liked ?
            <FontAwesomeIcon size='sm' icon={faSolidThumb} className={`h-5 group-hover:drop-shadow-none drop-shadow-[0_0_1px_black] group-hover:text-blue-700/95 group-active:text-violet-700 ${blog.liked ? "drop-shadow-none text-blue-700" : "text-white drop-shadow-[0_0_1px_black]"}`} />
            :
            <FontAwesomeIcon size='sm' icon={faRegularThumb} className={`h-[22px] group-hover:drop-shadow-none +group-hover:text-blue-700/95 group-active:text-violet-700 text-gray-400 dark:text-white group-hover:text-blue-700`} />
        }
        <div className={`${blog.liked ? "text-blue-700" : "text-gray-500/90"} group-hover:text-blue-700 group-active:text-violet-700`}>Like</div>
      </div>
      <div className={`w-1/3 py-[11px] rounded-sm hover:bg-gray-600/15 dark:hover:bg-white/5 cursor-pointer flex gap-4 items-center justify-center font-semibold group`} onClick={() => setOption(prev => prev === 1 ? 0 : 1)} >
        <FontAwesomeIcon size='sm' icon={faComment} className={`h-5 group-hover:drop-shadow-none drop-shadow-[0_0_1px_black] group-hover:text-blue-700/95 text-white`} />
        <div className={`text-gray-500/90 group-hover:text-blue-700`}>Comment</div>
      </div>
      <div className="w-1/3 py-[11px] rounded-sm hover:bg-gray-600/15 dark:hover:bg-white/5 cursor-pointer flex gap-4 items-center justify-center font-semibold group" onClick={() => setOption(2)} >
        <FontAwesomeIcon size='sm' icon={faShare} className='h-5 group-hover:drop-shadow-none drop-shadow-[0_0_1px_black] group-hover:text-blue-700/95 text-white' />
        <div className="text-gray-500/90 group-hover:text-blue-700">Share</div>
      </div>
    </div>
  )
}
