"use client";
import React, { useCallback, useState } from "react";
import { useAuth } from "../../_components/AuthProvider";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";


export default function Page(props) {
  const { socket, user } = useAuth();
  const [sender, setSender] = useState("hello");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(sender?.isOnline);

  const handleStatus = React.useCallback(({ _id, status }) => {
    if (sender._id == _id) {
      setStatus(status);
    }
  }, [sender]);


  const handleReceiveMessage = React.useCallback(async ({ data }) => {
    // console.log(data.sender, data.receiverId , sender?._id , user?._id);
    // if (data.senderId == sender?._id && data.receiverId == user?._id) {
    const box = document.querySelector(".chatting-message-box");
    let message = chatModel(data.Name, data.message, "left");
    box.appendChild(message);
    // }
  }, [])

  const handleSendNewMessage = (e) => {
    e.preventDefault();
    console.log("sending message...")
    if (message.length > 0) {
      socket?.emit('sendPersonalMessage', { receiverId: sender?._id, message });

      const box = document.querySelector('.chatting-message-box');
      let content = chatModel("you", message, 'right');
      box.appendChild(content);

      let data = {
        senderId: user?._id,
        senderName: user?.name,
        receiverId: sender?._id,
        receiverName: sender?.name,
        message,
      }
      axios.post('/api/chatLog', data)
        .then(response => response.data)
        .then(data => !data.success && alert(data.message))
        .catch(error => console.log(error.message));

      setMessage("");
    }
  }


  React.useEffect(() => {
    fetch(`/api/single-user/${props.params.newUserChat}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSender(data);
          setStatus(data.isOnline > 0);
        }
      });
  }, [props.params.newUserChat]);


  React.useEffect(() => {
    socket?.on("receivePersonalMessage", handleReceiveMessage);
    socket?.on("online-status", handleStatus);

    return () => {
      socket?.off("receivePersonalMessage", handleReceiveMessage);
      socket?.off("online-status", handleStatus);
    }
  }, [handleReceiveMessage, handleStatus, socket]);


  React.useEffect(() => {
    let body = {
      user1: props?.params?.newUserChat,
      user2: user?._id,
    }

    if (body.user1 && body.user2) {
      axios.put('/api/chatLog', body)
        .then(response => response.data)
        .then(data => {
          if (data.success) {
            const box = document.querySelector('.chatting-message-box');
            for (let index in data.chats) {
              let chat = data.chats[index];
              let content = chatModel(chat.receiverId === user._id ? chat.senderName : "you", chat.message, chat.receiverId === user._id ? 'left' : 'right');
              box.appendChild(content);
            }
          }
        })
        .catch(error => console.log(error.message));
    }
  }, [user._id, props?.params?.newUserChat]);


  return (
    <div className="text-white rounded-md bg-gradient-to-r from-white to-white dark:from-slate-900 dark:via-cyan-950 dark:to-slate-900 dark:text-white w-full max-w-[900px] mx-auto py-4 pb-12 overflow-hidden relative h-nav shadow-[0_0_2px_gray_inset] flex flex-col items-center justify-start" >
      <Link href={`/students/${sender?._id}`} className={`w-[98%] bg-slate-950/10 dark:bg-slate-900 ${status ? 'shadow-[0_0_3px_green]' : 'shadow-[0_0_3px_red]'} rounded-md pl-4 p-2 mx-4 md:mx-9 flex items-center gap-6 hover:bg-red-800/20 hover:animate-pulse`}>
        <Image src={sender?.imgUrl ? sender?.imgUrl : "/img/profileImg.jpg"} alt="image" height={70} width={70} className={`rounded-full w-16 h-16 ring-2 ${status ? "ring-green-600" : "ring-red-800"}`} />
        <div className={`relative text-2xl font-semibold  ${status ? 'drop-shadow-[1px_1px_1px_green]' : 'drop-shadow-[1px_1px_1px_red]'}`}>
          {sender?.name}
          <p onClick={handleReceiveMessage} className={`absolute top-0 text-[8px] font-semibold px-1 py-0 leading-4 inline-flex rounded-full ${status ? "dark:bg-green-800 bg-lime-900" : "dark:bg-red-800 bg-red-900"} `}>{status ? "online" : "offline"}</p>
        </div>
      </Link>

      <div className="w-[98%] chatting-message-box flex flex-col justify-start gap-3 py-3 overflow-auto flex-1">

      </div>

      <form className='flex items-center justify-center w-[98%] absolute bottom-2 bg-ed-500 gap-2 bg-blue-900/10 rounded overflow-hidden shadow-[0_0_1px_black_inset] focus-within:shadow-[0_0_3px_black_inset]' onSubmit={handleSendNewMessage}>
        <input className='w-full overflow-auto flex-1 pl-4 pr-1 py-2 outline-none bg-transparent text-gray-950 dark:text-white' placeholder="Enter your message" type='text' value={message} onChange={e => setMessage(e.target.value)} required />
        <FontAwesomeIcon size="sm" icon={faPaperPlane} className='h-6 cursor-pointer px-4 md:px-7 py-2 bg-blue-900 font-semibold opacity-80 hover:opacity-100 hover:text-yellow-500 text-gray-100 active:bg-violet-950' />
      </form>

    </div>
  );
}


function chatModel(name, message, direction) {
  const node = document.createElement('p');
  node.innerHTML = `<span class="text-gray-500">${name} : </span>${message}`;
  node.classList.add(`text-${direction}`, `${direction === "center" ? "self-center" : direction === "right" ? "self-end" : "start"}`, "py-1", "px-4", "rounded-md", "max-w-[80%]", "w-fit", "dark:bg-slate-950", "bg-gray-400");

  return (
    node
  )
};
