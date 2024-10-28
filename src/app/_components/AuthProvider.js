"use client"
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import io from "socket.io-client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const context = createContext();
export default function AuthProvider({ children, initial_theme, initialUserValue }) {
  const [user, setUser] = useState();
  let [socket, setSocket] = useState();
  const themeRef = useRef();

  const login = (userData) => {
    if (!socket && userData) {
      Initializing(userData, setSocket);
      setUser(userData);
    }
    socket?.on("disconnect", setUser(null));
  };

  const logout = () => {
    axios.get(`/api/single-user`);   //clear tocken-cookie
    socket.disconnect();
    setSocket(null);
    setUser(null);
  };

  useEffect(() => {
    login(initialUserValue);
  }, []);


  const value = { user, setUser, login, logout, socket, themeRef };


  return (
    <context.Provider value={value}>
      <body className={`${initial_theme} bg-gray-100/60 text-gray-800 dark:bg-black/90 dark:text-white`} ref={themeRef}>
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

      // socket.io.opts.reconnection = false;
      // console.log(sender.name);
      socket.emit('new-user', ({ name: sender.name, _id: sender._id }));
      setSocket(socket);
      // console.log(sender , setSocket, socket);

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