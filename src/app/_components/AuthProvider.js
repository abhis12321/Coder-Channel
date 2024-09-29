"use client";
import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import NavBar from "./NavBar";
import Footer from "./Footer";
const context = createContext();

export default function AuthProvider({ children, initial_theme, tocken }) {
  const [user, setUser] = useState(tocken);
  let [socket, setSocket] = useState();
  const themeRef = useRef();

  const login = useCallback(async ({ email, password }) => {
    if (!socket) {
      axios.put(`/api/users`, { email, password })
        .then(response => response.data)
        .then(data => {
          if (data.success) {
            Initializing(data.User, setSocket);
            setUser(data.User);
          } else {
            alert(data.message);
          }
        })
        .catch(error => alert('some went wrong, Try again.\n', error.message));
    }
    
    socket?.on("disconnect" , setUser(null));
  }, [socket]);

  const logout = () => {
    axios.post(`/api/single-user`);   //clear tocken-cookie
    socket.disconnect();
    // socket.io.opts.reconnection = false;
    setSocket(null);
    setUser(null);
  };

  const fetchTocken = async () => {
    const user = await axios.get(`/api/single-user`)
      .then(res => res?.data)
      .then(data => data?.User)
      .catch(() => null);
    if (user) {
      setUser(user);
      Initializing(user, setSocket);
    }
  }

  useEffect(() => {
    fetchTocken();
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
  } catch(error) {
    return { };
  }
};