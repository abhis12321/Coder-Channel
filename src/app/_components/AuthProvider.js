"use client";
import React from "react";
import io from "socket.io-client";
const context = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  let [socket , setSocket] = React.useState();
  

  const login = (person) => {
    Initializing(person , setSocket);
    setUser(person);
    localStorage.setItem('user', JSON.stringify(person));
  };

  const logout = () => {
    localStorage.setItem('user', JSON.stringify(null));
    socket?.disconnect();
    setUser(null);
    setSocket(null);
  };

  const value = {
    user,
    login,
    logout,
    socket,
  };


  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if(data != null) {
      login(data);
    }
  }, []);


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
      socket.emit('new-user' , sender.name);
      setSocket(socket);
      return () => {
          socket.disconnect();
        };
  })
}

export const useAuth = () => {
  return React.useContext(context);
};