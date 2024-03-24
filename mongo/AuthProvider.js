"use client";
import React from "react";
import io from "socket.io-client";
const context = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  let [socket , setSocket] = React.useState();
  
  const login = (person) => {
    initializing(person.name , setSocket);
    setUser(person);
    localStorage.setItem('user', JSON.stringify(person));
  };

  const logout = () => {
    localStorage.setItem('user', JSON.stringify(null));
    socket.disconnect();
    setUser(null);
    setSocket(null);
  };

  const value = {
    user,
    login,
    logout,
    socket,
  };

  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  );
}


async function initializing(name , setSocket) { 
  
  await fetch('/api/socket')
  .then(r => {
      let socket = io(undefined , {
          path:"/api/socket_io",
          addTrailingSlash: false,
      });
      

      socket?.on('connect' , () => { 
          // console.log("connected.." , socket.id);

          socket.emit('new-user' , name);
      });
      
      socket?.on('newUser' , Name => {                
          const box = document.querySelector('.chat-box');
          let message = chatModel(Name , "joined the chat" , 'center');
          box?.appendChild(message);
      });

      socket?.on('welcome' , data => {
          // console.log("welcome message" , socket.id);

      })
      
      socket?.on('receiveMessage' , data => {    
        // console.log("client received the message " , socket.id);

        const box = document.querySelector('.chat-box');
        let message = chatModel(data.Name , data.message , 'left');
        box.appendChild(message);  
      });
      
      socket?.on('receiveSoloMessage' , data => {    
        // let USER = useAuth();
        // if(data.senderId == USER.user._id && data.receiverId == "") {
          console.log("client received the message " , data);

          const box = document.querySelector('.chat-message-box');
          let message = chatModel(data.Name , data.message , 'left');
          box.appendChild(message);  
        // }
      });
  
      socket?.on('userDisconnected' , Name => {       
        // console.log("lalu" , Name + " diconnected now...");   

        const box = document.querySelector('.chat-box');
        let message = chatModel(Name , "left the chat" , 'center');
        box?.appendChild(message);
    });

      socket?.on('disconnect' , () => {
          console.log("socket.io Disconnected");
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

    socket?.emit('sendMessage' , {Name:name, message:content});
};


export function handleSoloMessage(content , name , socket, senderId , receiverId) {
  const box = document.querySelector('.chat-message-box');
  let message = chatModel("you" , content , 'right');

  box.appendChild(message);
  socket?.emit('sendSoloMessage' , {Name:name, message:content , senderId , receiverId});
};


export const useAuth = () => {
  return React.useContext(context);
};


function chatModel(name , message , dir) {
  const node = document.createElement('p');
  node.innerText = name + ": " + message;
  node.classList.add(dir);
  
  return (
    node
  )
}
