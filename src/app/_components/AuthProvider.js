"use client";
import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import NavBar from "./NavBar";
import Footer from "./Footer";
const context = createContext();

export default function AuthProvider({ children , initial_theme  }) {
  const [user, setUser] = useState(null);
  let [socket, setSocket] = useState();
  const [theme , setTheme] = useState(initial_theme);
  
  const login = useCallback(async ({ email, password }) => {
    if (!socket) {
      axios.put(`/api/users`, { email, password })
        .then(response => response.data)
        .then(data => {
          if (data.success) {
            Initializing(data.User, setSocket);
            setUser(data.User);
            axios.put(`/api/users/${data.User._id}`, { isOnline: 1 });
            localStorage.setItem('coder-media', JSON.stringify({ email , password }));
          } else {
            alert(data.message);
          }
        })
        .catch(error => alert('some error occured, Try again.\n', error.message));
    }
  }, [socket]);

  const logout = () => {
    localStorage.setItem('coder-media', JSON.stringify(null));
    socket?.disconnect();
    setSocket(null);
    setUser(null);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("coder-media"));
    data && login({ email: data.email, password: data.password });
  }, [login]);


  const value = { user, login, logout, socket, theme , setTheme };


  return (
    <context.Provider value={value}>
      <body className={`${theme} bg-gray-50 text-gray-800 dark:bg-slate-950 dark:text-white`}>
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
      });

      // console.log(sender.name);
      socket.emit('new-user', ({ name: sender.name, _id: sender._id }));
      setSocket(socket);

      return () => {
        socket.disconnect();
      };
    })
}

export const useAuth = () => {
  return React.useContext(context);
};