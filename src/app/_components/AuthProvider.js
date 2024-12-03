"use client"
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import io from "socket.io-client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const context = createContext();
export default function AuthProvider({ children, initial_theme, initialUserValue }) {
  const [user, setUser] = useState(initialUserValue);
  let [socket, setSocket] = useState();
  const themeRef = useRef();

  const login = (userData) => {
    if (!socket && userData) {
      Initializing(userData, setSocket);
      setUser(userData);
    }
  };

  const logout = () => {
    axios.get(`/api/single-user`); 
    socket.emit("logout" , user?._id);
    handleDisconnect();
  };
  
  const handleRefresh = () => {
    window?.location?.reload();
  }

  const handleDisconnect = () => {
    socket?.disconnect();
    setUser(null);
    setSocket(null);
  }

  const handleConnection = () => {    
    socket.emit('new-user', ({ name: user?.name, _id: user._id }));
  }

  useEffect(() => {
    socket?.on("refresh" , handleRefresh);
    socket?.on("connect" , handleConnection);
    return () => {
      socket?.off("refresh" , handleRefresh); 
      socket?.off("connect" , handleConnection);   
    }
  } , [socket]);
  

  useEffect(() => {
    if(initialUserValue) {
      Initializing(initialUserValue , setSocket);
    }
  }, []);

  const value = { user, setUser, login, logout, socket, themeRef };


  return (
    <context.Provider value={value}>
      <body className={`${initial_theme} overflow-x-hidden bg-gray-100/60 text-gray-700 dark:bg-gray-900 dark:text-white pt-16`} ref={themeRef}>
        <NavBar />
        <div className='h-nav'>
          {children}
        </div>
        <Footer />
      </body>
    </context.Provider>
  );
}


function Initializing(sender, setSocket) {
  fetch('/api/socket', {
    auth: {
      senderName: sender.name,
    }
  })
    .then(r => {
      let socket = io(undefined, {
        path: "/api/socket_io",
        addTrailingSlash: false,
        // reconnection:false,
      });
      setSocket(socket);

      return () => {
        socket.disconnect();
      };
    })
}

export const useAuth = () => {
  try {
    return useContext(context);
  } catch (error) {
    return {};
  }
};