"use client";
import React from "react";
import { useAuth } from "../../_components/AuthProvider";


export default function Page(props) {
  const USER = useAuth();
  const socket = USER.socket;
  const [user, setUser] = React.useState();
  const [message, setMessage] = React.useState("");

  const handleConnection = () => {
    socket.emit("new-user", USER.user?.name);
  }

  const handlePersonalMessage = (data) => {
    if (data.senderId == user?._id && data.receiverId == USER.user?._id) {
      const box = document.querySelector(".chatting-message-box");
      let message = chatModel(data.Name  , data.message, "left");
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
      const box = document.querySelector('.chatting-message-box');
      let content = chatModel("you" , message, 'right');
      box.appendChild(content);
      socket?.emit('sendPersonalMessage', { Name: USER.user?.name, message, senderId: USER?.user?._id, receiverId: user?._id });
      setMessage("");
    }
  };

  return (
    <div className="rounded-md bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 dark:from-slate-900 dark:via-cyan-950 dark:to-slate-900 dark:text-white w-[100%] max-w-[900px] mx-auto py-4 pb-12 overflow-hidden relative" style={{minHeight:"calc(100vh - 4.5rem)"}}>
      <div className="bg-slate-950/30 dark:bg-slate-900 shadow-[0_0_3px_red] rounded-md p-2 mx-4 md:mx-9">
        <h1 className="text-2xl font-semibold">{user?.name}</h1>
        <p>loading...</p>
      </div>

      <div className="chatting-message-box flex flex-col justify-evenly gap-3 p-3 overflow-auto flex-1 md:mx-6">

      </div>
      
      <form className='flex items-center justify-center px-4 md:px-9 w-[100%] absolute bottom-2 bg-ed-500 gap-2' onSubmit={handleSendNewMessage}>
        <input className='bg-slate-950/30 shadow-[0_0_3px_white] focus:shadow-[0_0_3px_cyan] outline-none flex-1 px-4 py-2 rounded-lg placeholder:text-gray-100 text-red-900 dark:text-gray-50' type='text' placeholder="Enter your message" value={message} onChange={e => setMessage(e.target.value)} required />
        <button className='hidden sm:block shadow-[0_0_3px_white] px-8 py-2 rounded-lg bg-sky-900 font-semibold opacity-80 hover:opacity-100 hover:text-yellow-500 active:bg-violet-950'>send</button>
      </form>
    </div>
  );
}


function chatModel(name , message, direction) {
  const node = document.createElement('p');
  node.innerHTML = `<span class="text-gray-500">${name} : </span>${message}`;
  node.classList.add(`text-${direction}`, `${direction === "center" ? "self-center" : direction === "right" ? "self-end" : "start"}`, "py-1", "px-4", "rounded-md", "max-w-[80%]", "w-fit", "dark:bg-slate-950" , "bg-gray-600");

  return (
    node
  )
};
