import {  } from '@fortawesome/free-regular-svg-icons'
import { faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function BlogFooter() {
  return (
    <div className='w-[97%] flex items-center justify-around'>
      <FontAwesomeIcon size='sm' icon={faHeart} className='w-1/3 h-5 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-110 hover:drop-shadow-none drop-shadow-[0_0_1px_red] hover:text-red-700/80' />
      <FontAwesomeIcon size='sm' icon={faCommentDots} className='w-1/3 h-5 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-110 hover:drop-shadow-none drop-shadow-[0_0_1px_blue] hover:text-blue-700/80' />
      <FontAwesomeIcon size='sm' icon={faShare} className='w-1/3 h-5 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-110 hover:drop-shadow-none drop-shadow-[0_0_1px_blue] hover:text-blue-700/80' />
    </div>
  )
}
