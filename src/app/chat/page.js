"use client"
import { ChatModel } from "../_components/ChatModel";
import { useAuth } from "../_components/AuthProvider";
import { memo, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const PublicChatDiscussion = () => {
    const messageCant = useRef();
    const [content, setContent] = useState("");
    let { user, socket } = useAuth();

    const scrollToBottom = () => {
        if (messageCant.current) {
            messageCant.current.scrollTop = messageCant.current.scrollHeight;
        }
    };

    const handleGroupMessage = (data) => {
        let message = ChatModel(data.name, data.message, "left", data._id);
        messageCant.current.appendChild(message);
        scrollToBottom();
    }

    useEffect(() => {
        socket?.on("receiveGroupMessage", handleGroupMessage);

        return () => {
            socket?.off("receiveGroupMessage", handleGroupMessage);
        }
    }, [socket])

    const handleMessage = e => {
        e.preventDefault();
        if (content.length > 0) {
            let message = ChatModel("you", content, 'right');
            messageCant.current.appendChild(message);
            socket?.emit('sendGroupMessage', { name: user?.name, message: content, _id: user?._id });
        }
        setContent("");
        scrollToBottom();
    }

    return (
    <div className='h-full w-full relative max-w-[900px] mx-auto bg-white dark:bg-slate-800 dark:text-white rounded-lg pb-1 overflow-auto h-nav shadow-[0_0_2px_gray_inset] flex flex-col items-center'>
        <h1 className='absolute top-1 left-4 text-yellow-600' >It&apos;s a Public Discussion Group...</h1>
        <div className="w-full px-[1%] max-h-[84.5vh] flex flex-col justify-start gap-3 py-3 overflow-auto flex-1 text-gray-600 dark:text-white new-scroll" ref={messageCant}>
            <div className='w-full px-4 flex flex-col gap-3 py-2 text-gray-100'>
                <p className='text-center text-3xl drop-shadow-[2px_3px_1px_red] font-semibold bg-slate-950/5 w-fit mx-auto rounded-lg py-2 px-4'>Welcome in the Discussion</p>
            </div>
        </div>

        <form className='flex items-center justify-center w-[98%] absolute bottom-2 bg-ed-500 gap-2 bg-blue-900/20 rounded-md overflow-hidden shadow-[0_0_1px_black_inset] focus-within:shadow-[0_0_3px_black_inset] dark:shadow-[0_0_1px_white_inset] dark:focus-within:shadow-[0_0_3px_white_inset]' onSubmit={handleMessage}>
            <input className='w-full overflow-auto flex-1 pl-4 pr-1 py-2 outline-none bg-transparent text-gray-950 dark:text-white' placeholder="Enter your message" type='text' value={content} onChange={e => setContent(e.target.value)} required />
            <button className="cursor-pointer px-4 md:px-7 py-2 bg-blue-900/80 hover:bg-blue-900 font-semibold hover:text-yellow-500 text-gray-100 active:bg-violet-950 shadow-[0_0_1px_black_inset] focus-within:shadow-[0_0_3px_black_inset] dark:shadow-[0_0_1px_white_inset] dark:focus-within:shadow-[0_0_3px_white_inset]"><FontAwesomeIcon size="sm" icon={faPaperPlane} className='h-6' /></button>
        </form>
    </div>
    )
}

export default memo(PublicChatDiscussion);