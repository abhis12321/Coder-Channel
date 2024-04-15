"use client"

import '../globals.css';
import React from "react";
import { useAuth } from "/mongo/AuthProvider";

function Page() {
    const [content , setContent] = React.useState("");
    let USER = useAuth();
    const socket = USER.socket;

    const handleNewUser = (Name) => {
        const box = document.querySelector(".chat-box");
        let message = chatModel(Name, "joined the chat", "center");
        box?.appendChild(message);
    }

    const handleGroupMessage = (data) => {
        const box = document.querySelector(".chat-box");
        let message = chatModel(data.Name, data.message, "left");
        box.appendChild(message);
    }

    const handleUserLeft = (Name) => {
        const box = document.querySelector(".chat-box");
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
            const box = document.querySelector('.chat-box');
            let message = chatModel("you" , content , 'right');
            box.appendChild(message);
            socket?.emit('sendGroupMessage' , {Name:USER.user?.name, message:content});
        }
        setContent("");
    }

    return (
        <div className='group-chat-box'>
            <div className='chat-box'>
                <h1>Chat Group...</h1>
                <p className='center'>Welcome in this chat group</p>
            </div>

            <form className='center chat-input-form'  onSubmit={handleMessage}>
                <input type='text' value = {content} onChange={e => setContent(e.target.value)}  required/>
                <button>click</button>
            </form>

        </div>
    )
}



function chatModel(name , message , directionClass) {
    const node = document.createElement('p');
    node.innerHTML = `<span class="chatter-name">${name} : </span>${message}`;
    node.classList.add(directionClass);
    
    return (
      node
    )
};

  
export default React.memo(Page);