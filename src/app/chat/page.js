"use client"
import LoginForm from "../_components/LoginForm";
import { ChatModel } from "../_components/ChatModel";
import { useAuth } from "../_components/AuthProvider";
import { memo, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
    const messageCant = useRef();
    const [content, setContent] = useState("");
    let USER = useAuth();
    const socket = USER.socket;

    const handleNewUser = (Name) => {
        let message = ChatModel(Name, "joined the chat", "center");
        messageCant.current.appendChild(message);
    }

    const handleGroupMessage = (data) => {
        let message = ChatModel(data.Name, data.message, "left");
        messageCant.current.appendChild(message);
    }

    const handleUserLeft = ({ Name }) => {
        let message = ChatModel(Name, "left the chat", "center");
        messageCant.current.appendChild(message);
    }

    useEffect(() => {
        socket?.on("newUserInGroup", handleNewUser);
        socket?.on("receiveGroupMessage", handleGroupMessage);
        socket?.on("userLeftGroup", handleUserLeft);

        return () => {
            socket?.off("newUserInGroup", handleNewUser);
            socket?.off("receiveGroupMessage", handleGroupMessage);
            socket?.off("userLeftGroup", handleUserLeft);
        }
    }, [socket])

    const handleMessage = e => {
        e.preventDefault();
        if (content.length > 0) {
            // const box = document.querySelector('.chatting-box');
            let message = ChatModel("you", content, 'right');
            messageCant.current.appendChild(message);
            socket?.emit('sendGroupMessage', { Name: USER.user?.name, message: content });
        }
        setContent("");
    }

    return (
        <div className='h-nav w-full flex items-center justify-center'>
            {
                USER?.user ?
                    <div className='h-full w-full relative max-w-[900px] mx-auto bg-white dark:bg-slate-900/80 dark:text-white rounded-lg pb-1 overflow-auto h-nav shadow-[0_0_2px_gray_inset] dark:shadow-[0_0_2px_white_inset] flex flex-col items-center'>
                        <div className='w-full overflow-x-hidden px-4 flex flex-col gap-3 pt-3 pb-4 text-gray-100'>
                            <h1 className='text-yellow-600' >It&apos;s a Public Chat Group...</h1>
                            <p className='text-center text-3xl drop-shadow-[2px_3px_1px_red] font-semibold bg-slate-950/5 w-fit mx-auto rounded-lg py-2 px-4'>Welcome in this chat group</p>
                        </div>
                        <div className="w-full overflow-x-hidden px-4 flex flex-col gap-3 text-gray-600 dark:text-white" ref={messageCant}></div>

                        <form className='flex items-center justify-center w-[98%] absolute bottom-2 bg-ed-500 gap-2 bg-blue-900/20 rounded-md overflow-hidden shadow-[0_0_1px_black_inset] focus-within:shadow-[0_0_3px_black_inset] dark:shadow-[0_0_1px_white_inset] dark:focus-within:shadow-[0_0_3px_white_inset]' onSubmit={handleMessage}>
                            <input className='w-full overflow-auto flex-1 pl-4 pr-1 py-2 outline-none bg-transparent text-gray-950 dark:text-white' placeholder="Enter your message" type='text' value={content} onChange={e => setContent(e.target.value)} required />
                            <button className="cursor-pointer px-4 md:px-7 py-2 bg-blue-900/80 hover:bg-blue-900 font-semibold hover:text-yellow-500 text-gray-100 active:bg-violet-950 shadow-[0_0_1px_black_inset] focus-within:shadow-[0_0_3px_black_inset] dark:shadow-[0_0_1px_white_inset] dark:focus-within:shadow-[0_0_3px_white_inset]"><FontAwesomeIcon size="sm" icon={faPaperPlane} className='h-6' /></button>
                        </form>
                    </div>
                    :
                    <LoginForm />
            }
        </div>
    )
}

export default memo(Page);