import Link from 'next/link'
import { useEffect } from 'react'
import ChatBarUser from './ChatBarUser'
import { useAuth } from './AuthProvider'
import { faUsersLine } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ChatNavBar({ senders, listRef }) {
    const { socket } = useAuth()
    useEffect(() => {
        socket?.emit("loadOnlineUsers", senders?.[0]?._id)
    }, [socket,senders]);
    return (
        <div className="max-h-nav w-[75%] h-[100%] md:h-auto max-w-[300px] absolute z-10 md:static top-0 -left-full flex flex-col gap-[1px] bg-blue-50 dark:bg-blue-800/30 dark:text-white shadow-[-1px_-.5px_1px_gray_inset] dark:shadow-[-1px_-.5px_1px_white_inset] duration-500 backdrop-blur-md md:backdrop-blur-none new-scroll overflow-x-hidden" ref={listRef}>
            <Link href="/chat" className='w-full py-[12px] px-1 md:px-2 rounded flex gap-2 items-center bg-gray-600/20 dark:bg-black/20 hover:bg-violet-700/40 shadow-[0_0_1px_gray_inset] group'>
                <FontAwesomeIcon size='sm' icon={faUsersLine} className='h-9' />
                <span className="flex flex-col group-hover:underline font-bold text-xl text-nowrap">Discussion</span>
            </Link>
            {senders?.map(sender => <ChatBarUser key={sender?._id} sender={sender} />)}
        </div>
    )
}
