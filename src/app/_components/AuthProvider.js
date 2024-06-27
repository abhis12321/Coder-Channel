"use client";
import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
const context = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  let [socket, setSocket] = useState();


  const login = useCallback(async ({ email, password }) => {
    console.log("login" , email , password);
    if (!socket) {
      axios.put(`/api/users`, { email, password })
        .then(response => response.data)
        .then(data => {
          if (data.success) {
            Initializing(data.User, setSocket);
            setUser(data.User);
            axios.put(`/api/users/${data.User._id}`, { isOnline: 1 });
            localStorage.setItem('coder-media', JSON.stringify({ email , password}));
          } else {
            alert(data.message);
          }
        })
        .catch(error => alert('some error occured, Try again.\n', error.message));
    }
  }, [socket]);

  const logout = () => {
    axios.put(`/api/users/${user._id}`, { status: false });
    localStorage.setItem('coder-media', JSON.stringify(null));
    socket?.disconnect();
    setSocket(null);
    setUser(null);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("coder-media"));
    data && login({ email: data.email, password: data.password });
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