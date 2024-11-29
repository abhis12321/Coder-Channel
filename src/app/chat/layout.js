"use client"
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoginForm from '../_components/LoginForm';
import { useAuth } from '../_components/AuthProvider';
import Image from 'next/image';

export default function layout({ children }) {
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

    return (
        <div className='h-nav w-full flex items-center justify-center'>
            {
                !user ?
                    <LoginForm />
                    :
                    <div className="w-full flex justify-center">
                        <div className="w-[40%] max-w-[300px] flex flex-col gap-[1px] bg-blue-50 dark:bg-gray-800/90 dark:text-white shadow-[-1px_-.5px_1px_gray_inset] dark:shadow-[-1px_-.5px_1px_white_inset]">
                            <Link href="/chat" className='w-full py-[2px] px-1 md:px-2 rounded flex gap-2 items-center bg-gray-600/20 hover:bg-green-600/15 shadow-[0_0_1px_gray_inset] group'>
                                <Image src='/img/profileImg.jpg' alt='' height={50} width={50} className='w-10 aspect-square rounded-full' />
                                <span className="flex flex-col group-hover:underline">Group-Chat</span>
                            </Link>
                            {senders?.map(sender => <Link href={`/chat/${sender?._id}`} key={sender?._id} className='w-full py-[2px] px-1 md:px-2 rounded flex gap-2 items-center bg-gray-600/20 hover:bg-green-600/15 shadow-[0_0_1px_gray_inset] group'>
                                <Image src={sender?.imgUrl} alt='' height={50} width={50} className='w-10 aspect-square rounded-full' />
                                <span className="flex flex-col">
                                    <span className="font-semibold group-hover:underline">{sender?.name}</span>
                                    <span className="text-xs font-light">{sender?.university}</span>
                                </span>
                            </Link>)}
                        </div>
                        {
                            children
                        }
                    </div>
            }
        </div>
    )
}
