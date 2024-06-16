"use client";
import axios from "axios";
import React , { createContext, useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
const context = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  let [socket , setSocket] = useState();
  

  const login = useCallback((person) => {
    if(!socket) {
      Initializing(person , setSocket);
    }
    // console.log("logging-in");
    setUser({...person});
    axios.put(`/api/users/${person._id}` , { status:true });
    localStorage.setItem('student-media', JSON.stringify(person));
  }, [socket]);

  const logout = () => {
    socket?.emit('user-disconnected' , ({name:user.name , _id:user._id}));
    axios.put(`/api/users/${user._id}` , { status:false });
    localStorage.setItem('student-media', JSON.stringify(null));
    // console.log("being ofline.." , socket.connected);
    socket?.disconnect();
    setSocket(null);
    setUser(null);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("student-media"));
    if(data != null) {
      login(data);
    }
  }, [login]);


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


function Initializing(sender , setSocket ) { 
  fetch('/api/socket' , {
        auth:{
            senderName : sender.name,
        }
    })
  .then(r => {
      let socket = io(undefined , {
          path:"/api/socket_io",
          addTrailingSlash: false,
      });
      
      // console.log(sender.name);
      socket.emit('new-user' , ({name:sender.name , _id:sender._id}));
      setSocket(socket);

      return () => {
          socket.disconnect();
        };
  })
}

export const useAuth = () => {
  return React.useContext(context);
};