"use client"

import '../globals.css';
import React from "react";
import { useAuth } from "/mongo/AuthProvider";

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

    const handleUserLeft = (Name) => {
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
        <div className='h-[100%] min-h-[90.9vh] relative max-w-[900px] mx-auto bg-slate-900 rounded-lg pb-14  overflow-auto '  style={{height:'calc(100vh-4rem)'}}>
            <div className='chatting-box px-4 flex flex-col gap-3 p-3max-h-[90.9vh] pb-14'>
                <h1 className='drop-shadow-[0_0_5px_yellow]' >It&apos;s a Public Chat Group...</h1>
                <p className='text-center text-3xl drop-shadow-[0_0_5px_red] font-semibold mb-8'>Welcome in this chat group</p>
            </div>

            <form className='flex items-center justify-center px-4 w-[100%] absolute bottom-2 bg-ed-500 gap-4'  onSubmit={handleMessage}>
                <input className='bg-inherit shadow-[0_0_5px_white] w-[80%] px-4 py-2 rounded-lg' type='text' value = {content} onChange={e => setContent(e.target.value)}  required/>
                <button className='bg-inherit shadow-[0_0_5px_white] px-8 py-2 rounded-lg bg-blue-800 font-semibold opacity-80 hover:opacity-100 active:bg-violet-950'>click</button>
            </form>

        </div>
    )
}



function chatModel(name , message , direction) {
    const node = document.createElement('p');
    node.innerHTML = `<span class="chatter-name">${name} : </span>${message}`;
    node.classList.add(`text-${direction}` , `${direction === "center" ? "self-center" : direction === "right" ? "self-end" : "start"}` , "py-2" , "px-4" , "rounded-lg" , "max-w-[80%]" , "w-fit" , "bg-gray-800");
    
    return (
      node
    )
};

  
export default React.memo(Page);