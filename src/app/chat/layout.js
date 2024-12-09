"use client"
import axios from 'axios';
import LoginForm from '../_components/LoginForm';
import ChatNavBar from '../_components/ChatNavBar';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../_components/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';

export default function layout({ children }) {
    const listRef = useRef();
    const menuRef = useRef();
    const { user, socket } = useAuth();
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
        menuRef?.current.classList.toggle("scale-0");
    }

    const hideUsersList = () => {
        if (!listRef?.current.classList.contains("-left-full")) {
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
                        <ChatNavBar senders={senders} listRef={listRef} />
                        <button className="flex md:hidden absolute top-20 left-4 z-10 font-bold text-white active:text-orange-600 shadow-[2px_1.5px_1px_black] dark:shadow-sm dark:shadow-white bg-green-600 rounded-3xl px-[1px] duration-500" onClick={handleUsersList} onBlur={hideUsersList} ref={menuRef} ><FontAwesomeIcon size='sm' icon={faCommentDots} className='h-7' /></button>
                        { children }
                    </div>
            }
        </div>
    )
}
