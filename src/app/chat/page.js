
"use client"


import '../globals.css';
import React from "react";
import io from "socket.io-client";


function Page() {
    let [name , setName] = React.useState(null);
    let [socket , setSocket] = React.useState();
    const [content , setContent] = React.useState();
    React.useEffect(() => {
        console.log("mounting.");
        initializing();
    } , [])


    async function initializing() {
        // name="heroku"
        name = prompt('Enter you name to join the chat');
        await fetch('/api/socket')
        .then(r => {
            socket = io(undefined , {
                path:"/api/socket_io",
                addTrailingSlash: false,
            });
            

            socket?.on('connect' , () => { 
                console.log("connected.." , socket.id);
                socket.emit('new-user' , name);
            });
            
            socket?.on('newUser' , Name => {                
                const box = document.querySelector('.chat-box');
                let message = chatModel(Name , "joined the chat" , 'center');
                box.appendChild(message);
            });

            socket?.on('welcome' , data => {
                console.log("welcome message" , socket.id);
            })
            
            socket?.on('receiveMessage' , data => {    
                  const box = document.querySelector('.chat-box');
                  let message = chatModel(data.Name , data.message , 'left');
                  box.appendChild(message);
        
                console.log("client received the message " , socket.id);
            });
        
            socket?.on('disconnect' , () => {
                console.log("Disconnected");
            });
        
            setName(name);
            setSocket(socket);
            return () => {
                socket.disconnect();
              };
        })
    }

    
    const handleClick = e => {
          const box = document.querySelector('.chat-box');
          let message = chatModel("you" , content , 'right');
          box.appendChild(message);

        console.log("Clicking" , socket.id);
        socket?.emit('sendMessage' , {Name: name, message:content});
        setContent("");
    };
    
    return (
        <div>
            <div className='chat-box'>
                <h1>Chat Group..</h1>
                <p className='left'>Welcome in this chat group</p>
            </div>

            <div className='center chat-input-form'>
                <input type='text' value = {content} onChange={e => setContent(e.target.value)}  required/>
                <button onClick={handleClick}>click</button>
            </div>

        </div>
    )
}

const chatModel = (name , message , dir) => {
  const node = document.createElement('p');
  node.innerText = name + ": " + message;
  node.classList.add(dir);
  return (
    node
  )
}

export default React.memo(Page);