"use client"
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import LoginForm from '../_components/LoginForm';
import { useAuth } from '../_components/AuthProvider';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faUsersLine } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';

export default function layout({ children }) {
    const listRef = useRef();
    const menuRef = useRef();
    const { user } = useAuth();
    const [senders, setSenders] = useState([]);

    const loadSenders = () => {
        axios.get('/api/chatLog')
            .then(res => res.data)
            .then(data => data.senders)
            .then(senders => setSenders(senders))
            .catch(error => console.error(error.message));
    }

    useEffect(() => {
        loadSenders();
    }, []);

    const handleUsersList = () => {
        listRef?.current.classList.toggle("-left-full");
        listRef?.current.classList.toggle("left-0");
        // menuRef?.current.classList.toggle("flex");
        menuRef?.current.classList.toggle("scale-0");
    }

    const hideUsersList = () => {
        if(!listRef?.current.classList.contains("-left-full")) {
            handleUsersList();
        }
    }

    return (
        <div className='h-nav w-full flex items-center justify-center'>
            {
                !user ?
                    <LoginForm />
                    :
                    <div className="w-full h-full flex justify-center relative bg-red400">
                        <div className="max-h-nav w-[40%] h-[100%] md:h-auto max-w-[300px] absolute z-10 md:static top-0 -left-full flex flex-col gap-[1px] bg-blue-50 dark:bg-blue-800/30 dark:text-white shadow-[-1px_-.5px_1px_gray_inset] dark:shadow-[-1px_-.5px_1px_white_inset] duration-500 backdrop-blur-md md:backdrop-blur-none new-scroll overflow-x-hidden" ref={listRef}>
                            <Link href="/chat" className='w-full py-[9px] px-1 md:px-2 rounded flex gap-2 items-center bg-gray-600/20 dark:bg-black/20 hover:bg-violet-700/40 shadow-[0_0_1px_gray_inset] group'>
                                <FontAwesomeIcon size='sm' icon={faUsersLine} className='h-8'  />
                                <span className="flex flex-col group-hover:underline font-bold text-lg text-nowrap">Discussion</span>
                            </Link>
                            {senders?.map(sender => <Link href={`/chat/${sender?._id}`} key={sender?._id} className='w-full py-[2px] px-1 md:px-2 rounded flex gap-2 items-center bg-gray-600/20 dark:bg-black/20 hover:bg-cyan-700/50 dark:hover:bg-cyan-600/15 shadow-[0_0_1px_white_inset] dark:shadow-gray-500 hover:shadow-red-700 hover:shadow-sm group'>
                                <Image src={sender?.imgUrl} alt='' height={50} width={50} className='w-10 aspect-square rounded-full' />
                                <span className="flex flex-col">
                                    <span className="font-semibold group-hover:underline text-nowrap">{sender?.name}</span>
                                    <span className="text-xs font-light text-nowrap">@{sender?.university}</span>
                                </span>
                            </Link>)}
                        </div>

                        <button className="flex md:hidden absolute top-20 left-4 z-10 font-bold text-white active:text-orange-600 shadow-[2px_1.5px_1px_black] dark:shadow-sm dark:shadow-white bg-green-600 rounded-3xl px-[1px] duration-500" onClick={handleUsersList} onBlur={hideUsersList} ref={menuRef} ><FontAwesomeIcon size='sm' icon={faCommentDots} className='h-7'/></button>
                        {
                            children
                        }
                    </div>
            }
        </div>
    )
}
