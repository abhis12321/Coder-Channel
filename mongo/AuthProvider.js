"use client";
import React from "react";
import io from "socket.io-client";
const context = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  let [socket , setSocket] = React.useState();
  const [receiver, setReceiver] = React.useState(null);
  

  const login = (person) => {
    Initializing(person , setSocket , receiver);
    setUser(person);
    localStorage.setItem('user', JSON.stringify(person));
  };

  const logout = () => {
    localStorage.setItem('user', JSON.stringify(null));
    socket.disconnect();
    setUser(null);
    setSocket(null);
    setReceiver(null);
  };

  const setReceiverUser = userData => {
    setReceiver(userData);
    socket?.disconnect();
    Initializing(user , setSocket , userData);
  }

  const value = {
    user,
    login,
    logout,
    socket,
    setReceiverUser,
  };


  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  );
}


function Initializing(sender , setSocket , receiver) { 
  fetch('/api/socket')
  .then(r => {
      let socket = io(undefined , {
          path:"/api/socket_io",
          addTrailingSlash: false,
      });
      

      socket?.on('connect' , () => { 
          socket.emit('new-user' , sender?.name);
      });
   
      
      socket?.on('newUser' , Name => {                
          const box = document.querySelector('.chat-box');
          let message = chatModel(Name , "joined the chat" , 'center');
          box?.appendChild(message);
      });


      socket?.on('welcome' , data => {
          // console.log("welcome message" , data);
      })
        
      
      socket?.on('receivePersonalMessage' , data => {  
        if(data.senderId == receiver?._id && data.receiverId == sender?._id) {
          const box = document.querySelector('.chat-message-box');
          let message = chatModel(data.Name , data.message , 'left');
          box.appendChild(message);  
        }
      });
  

      socket?.on('receiveGroupMessage' , data => {    
        const box = document.querySelector('.chat-box');
        let message = chatModel(data.Name , data.message , 'left');
        box.appendChild(message);  
      });
      

      socket?.on('userLeftGroup' , Name => {     
        const box = document.querySelector('.chat-box');
        let message = chatModel(Name , "left the chat" , 'center');
        box?.appendChild(message);
      });


      socket?.on('disconnect' , () => {
          // console.log("socket.io Disconnected");
      });
  
      setSocket(socket);
      return () => {
          socket.disconnect();
        };
  })
}





export function handleMessage(content , name , socket) {
    const box = document.querySelector('.chat-box');

    let message = chatModel("you" , content , 'right');
    box.appendChild(message);

    socket?.emit('sendGroupMessage' , {Name:name, message:content});
};


export function handleSoloMessage(content , name , socket, senderId , receiverId) {
  const box = document.querySelector('.chat-message-box');
  let message = chatModel("you" , content , 'right');

  box.appendChild(message);
  socket?.emit('sendPersonalMessage' , {Name:name, message:content , senderId , receiverId});
};


export const useAuth = () => {
  return React.useContext(context);
};


function chatModel(name , message , directionClass) {
  const node = document.createElement('p');
  node.innerHTML = `<span>${name}</span> : ${message}`;
  node.classList.add(directionClass);
  
  return (
    node
  )
}
