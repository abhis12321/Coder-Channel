"use client"

import React from "react";
import { useAuth } from "../_components/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function Page() {
    const [content , setContent] = React.useState("");
    let USER = useAuth();
    const socket = USER.socket;

    const handleNewUser = (Name) => {
        const box = document.querySelector(".chatting-box");
        let message = chatModel(Name, "joined the chat", "center");
        box?.appendChild(message);
    }

    const handleGroupMessage = (data) => {
        const box = document.querySelector(".chatting-box");
        let message = chatModel(data.Name, data.message, "left");
        box.appendChild(message);
    }

    const handleUserLeft = ({Name}) => {
        const box = document.querySelector(".chatting-box");
        let message = chatModel(Name, "left the chat", "center");
        box?.appendChild(message);
    }

    const handleWelcome = (data) => {
        // console.log("welcome message" , data);
    }
    
    React.useEffect(() => {
        socket?.on("newUser", handleNewUser);        
        socket?.on("welcome", handleWelcome);    
        socket?.on("receiveGroupMessage", handleGroupMessage);    
        socket?.on("userLeftGroup", handleUserLeft);    
        
        return () => {
            socket?.off("newUser", handleNewUser);            
            socket?.off("welcome", handleWelcome);        
            socket?.off("receiveGroupMessage", handleGroupMessage);        
            socket?.off("userLeftGroup", handleUserLeft);
        }
    } , [])

    const handleMessage = e => {  
        e.preventDefault();
        if(content.length > 0) {
            const box = document.querySelector('.chatting-box');
            let message = chatModel("you" , content , 'right');
            box.appendChild(message);
            socket?.emit('sendGroupMessage' , {Name:USER.user?.name, message:content});
        }
        setContent("");
    }

    return (
        <div className='h-full w-full relative max-w-[900px] mx-auto bg-white dark:bg-slate-900 dark:text-white rounded-lg pb-1 overflow-auto h-nav shadow-[0_0_2px_gray_inset] flex flex-col items-center'>
            <div className='w-full overflow-x-hidden chatting-box px-4 flex flex-col gap-3 p-3max-h-[90.9vh] pt-3 pb-14 text-gray-100'>
                <h1 className='text-yellow-600' >It&apos;s a Public Chat Group...</h1>
                <p className='text-center text-3xl drop-shadow-[2px_3px_1px_red] font-semibold bg-slate-950/5 w-fit mx-auto rounded-lg py-2 px-4'>Welcome in this chat group</p>
            </div>

            <form className='flex items-center justify-center w-[98%] absolute bottom-2 bg-ed-500 gap-2 bg-blue-900/10 rounded overflow-hidden shadow-[0_0_1px_black_inset] focus-within:shadow-[0_0_3px_black_inset]'  onSubmit={handleMessage}>
                <input className='w-full overflow-auto flex-1 pl-4 pr-1 py-2 outline-none bg-transparent text-gray-950 dark:text-white' placeholder="Enter your message" type='text' value = {content} onChange={e => setContent(e.target.value)}  required/>
                <FontAwesomeIcon size="sm" icon={faPaperPlane} className='h-6 cursor-pointer px-4 md:px-7 py-2 bg-blue-900 font-semibold opacity-80 hover:opacity-100 hover:text-yellow-500 text-gray-100 active:bg-violet-950' />
            </form>

        </div>
    )
}



function chatModel(name , message , direction) {
    const node = document.createElement('p');
    node.innerHTML = `<span class="text-gray-500">${name} : </span>${message}`;
    node.classList.add(`text-${direction}` , `${direction === "center" ? "self-center" : direction === "right" ? "self-end" : "start"}` , "py-2" , "px-4" , "rounded-lg" , "max-w-[80%]" , "w-fit" , "dark:bg-slate-950" , "bg-gray-400" , "whitespace-pre-wrap" , "overflow-break");
    
    return (
      node
    )
};

  
export default React.memo(Page);