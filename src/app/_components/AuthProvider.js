"use client";
import React, { useCallback } from "react";
import io from "socket.io-client";
const context = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  let [socket , setSocket] = React.useState();
  

  const login = useCallback((person) => {
    if(!socket) {
      Initializing(person , setSocket);
    }
    setUser(person);
    localStorage.setItem('user', JSON.stringify(person));
    console.log("logging-in");
  }, [socket]);

  const logout = () => {
    socket?.emit('user-disconnected' , ({name:user.name , _id:user._id}));
    console.log("being ofline.." , user);
    socket?.disconnect();
    setUser(null);
    setSocket(null);
    localStorage.setItem('user', JSON.stringify(null));
  };

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
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