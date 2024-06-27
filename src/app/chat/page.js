"use client"

import React from "react";
import { useAuth } from "../_components/AuthProvider";

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
        <div className='h-full relative max-w-[900px] mx-auto bg-gradient-to-r from-white to-white dark:from-slate-900 dark:via-cyan-950 dark:to-slate-900 dark:text-white rounded-lg pb-1 overflow-auto h-nav'>
            <div className='chatting-box px-4 flex flex-col gap-3 p-3max-h-[90.9vh] pt-3 pb-14 text-gray-100'>
                <h1 className='text-yellow-600' >It&apos;s a Public Chat Group...</h1>
                <p className='text-center text-3xl drop-shadow-[2px_3px_1px_red] font-semibold bg-slate-950/5 w-fit mx-auto rounded-lg py-2 px-4'>Welcome in this chat group</p>
            </div>

            <form className='flex items-center justify-center px-4 w-[100%] absolute bottom-2 bg-ed-500 gap-2 text-gray-100'  onSubmit={handleMessage}>
                <input className='flex-1 px-4 py-2 rounded-lg outline-none ring-1 focus:ring-2 ring-cyan-600 bg-blue-900/10 focus:bg-blue-700/20' placeholder="Enter your message" type='text' value = {content} onChange={e => setContent(e.target.value)}  required/>
                <button className='hidden sm:block px-8 py-2 rounded-lg bg-blue-900 font-semibold opacity-80 hover:opacity-100 hover:text-yellow-500 active:bg-violet-950 ring-1 active:ring-2 ring-red-500'>send</button>
            </form>

        </div>
    )
}



function chatModel(name , message , direction) {
    const node = document.createElement('p');
    node.innerHTML = `<span class="text-gray-400">${name} : </span>${message}`;
    node.classList.add(`text-${direction}` , `${direction === "center" ? "self-center" : direction === "right" ? "self-end" : "start"}` , "py-2" , "px-4" , "rounded-lg" , "max-w-[80%]" , "w-fit" , "dark:bg-slate-950" , "bg-gray-600");
    
    return (
      node
    )
};

  
export default React.memo(Page);