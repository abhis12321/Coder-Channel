"use client";

import React from "react";
import { useAuth } from "/mongo/AuthProvider";

export default function Page(props) {
  const USER = useAuth();
  const socket = USER.socket;
  const [user, setUser] = React.useState();
  const [message, setMessage] = React.useState("");

  const handleConnection = () => {
    socket.emit("new-user", USER.user?.name);
  }

  const handlePersonalMessage =  (data) => {
    if (data.senderId == user?._id && data.receiverId == USER.user?._id) {
      const box = document.querySelector(".chat-message-box");
      let message = chatModel(data.message, "left");
      box.appendChild(message);
    }
  }

  const handleDisconnection = () => {
    console.log("socket.io Disconnected");
  }

  React.useState(async () => {
    fetch(`/api/mongo/form2/${props.params.newUserChat}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data);
        }
      });
  }, []);

  React.useEffect(() => {
    socket?.on("connect", handleConnection);

    socket?.on("receivePersonalMessage", handlePersonalMessage);

    socket?.on("disconnect", handleDisconnection);


    return () => {
      socket?.off("connect", handleConnection);

      socket?.off("receivePersonalMessage", handlePersonalMessage);

      socket?.off("disconnect", handleDisconnection);
    }
  });

  const handleSendNewMessage = (e) => {
    e.preventDefault();
    if (message.length > 0) {      
      const box = document.querySelector('.chat-message-box');
      let content = chatModel(message , 'right');
      box.appendChild(content);
      socket?.emit('sendPersonalMessage' , { Name : USER.user?.name , message , senderId : USER?.user?._id , receiverId : user?._id });
      setMessage("");
    }
  };

  return (
    <div className="live-chat-box">
      <div className="user-info-for-chat">
        <h1>{user?.name}</h1>
        <p>loading...</p>
      </div>

      <div className="chat-message-box"></div>
      <form className="new-message-sending-box" onSubmit={handleSendNewMessage}>
        <input
          type="text"
          className="message-input-box-tag"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="message-input-box-tag">send</button>
      </form>
    </div>
  );
}



function chatModel(message , directionClass) {
  const node = document.createElement('p');
  node.innerHTML = `${message}`;
  node.classList.add(directionClass);
  
  return (
    node
  )
}
