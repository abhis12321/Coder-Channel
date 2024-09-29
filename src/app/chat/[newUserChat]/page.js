"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../_components/AuthProvider";
import { ChatModel } from "../../_components/ChatModel";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import LoginForm from "../../_components/LoginForm";


export default function Page(props) {
  const messageRef = useRef();
  const { socket, user } = useAuth();
  const [sender, setSender] = useState("hello");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(sender?.isOnline);

  const handleStatus = useCallback(({ _id, status }) => {
    if (sender._id == _id) {
      setStatus(status);
    }
  }, [sender]);


  const handleReceiveMessage = useCallback(async ({ message, senderId, receiverId, senderName }) => {
    // console.log(data.sender, data.receiverId , sender?._id , user?._id);
    if (senderId == sender?._id && receiverId == user?._id) {
      appendNewMessageToCant(senderName, message, "left");
    }
  }, [sender?._id, user?._id])

  const handleSendNewMessage = (e) => {
    e.preventDefault();
    // console.log("sending message...");
    let data = {
      senderId: user?._id,
      senderName: user?.name,
      receiverId: sender?._id,
      receiverName: sender?.name,
      message,
    }

    if (message.length > 0) {
      socket?.emit('sendPersonalMessage', data);
      appendNewMessageToCant("you", message, 'right');

      axios.post('/api/chatLog', data)
        .then(response => response.data)
        .then(data => !data.success && alert(data.message))
        .catch(error => console.log(error.message));

      setMessage("");
    }
  }


  useEffect(() => {
    fetch(`/api/single-user/${props.params.newUserChat}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSender(data);
          setStatus(data.isOnline > 0);
        }
      });
  }, [props.params.newUserChat]);


  useEffect(() => {
    socket?.on("receivePersonalMessage", handleReceiveMessage);
    socket?.on("online-status", handleStatus);

    return () => {
      socket?.off("receivePersonalMessage", handleReceiveMessage);
      socket?.off("online-status", handleStatus);
    }
  }, [handleReceiveMessage, handleStatus, socket]);


  useEffect(() => {
    let body = {
      user1: props?.params?.newUserChat,
      user2: user?._id,
    }

    if (body.user1 && body.user2) {
      axios.put('/api/chatLog', body)
        .then(response => response.data)
        .then(data => {
          // console.log(data)
          if (data.success) {
            data.chats?.map(chat => {
              let flag = chat.receiverId._id === user._id;
              appendNewMessageToCant(flag ? chat.senderId.name : "you", chat.message, flag ? 'left' : 'right');
            })
          }
        })
        .catch(error => console.error(error.message));
    }
  }, [user?._id, props?.params?.newUserChat]);

  const appendNewMessageToCant = (sender, message, direction) => {
    let content = ChatModel(sender, message, direction);
    messageRef.current.appendChild(content);
  }

  return (
    <div className='h-nav w-full flex items-center justify-center'>
      {
        user ?
          <div className="text-white rounded-md bg-gradient-to-r from-white to-white dark:from-slate-900/80 dark:via-blue-950/60 dark:to-slate-900/80 dark:text-white w-full max-w-[900px] mx-auto py-4 pb-12 overflow-hidden relative h-nav shadow-[0_0_2px_gray] dark:shadow-[0_0_2px_white] flex flex-col items-center justify-start" >
            <Link href={`/students/${sender?._id}`} className={`w-[98%] bg-green-950/10 dark:bg-gray-950/20 ${status ? 'shadow-[0_0_3px_green]' : 'shadow-[0_0_3px_red]'} rounded-md pl-4 p-2 mx-4 md:mx-9 flex items-center gap-6 hover:bg-red-800/20 hover:animate-pulse`}>
              <Image src={sender?.imgUrl ? sender?.imgUrl : "/img/profileImg.jpg"} alt="image" height={70} width={70} className={`rounded-full w-16 h-16 ring-2 ${status ? "ring-green-600" : "ring-red-800"}`} />
              <div className={`relative text-2xl font-semibold  ${status ? 'drop-shadow-[1px_1px_1px_green]' : 'drop-shadow-[1px_1px_1px_red]'}`}>
                {sender?.name}
                <p onClick={handleReceiveMessage} className={`absolute top-0 text-[8px] font-semibold px-1 py-0 leading-4 inline-flex rounded-full ${status ? "dark:bg-green-800 bg-lime-900" : "dark:bg-red-800 bg-red-900"} `}>{status ? "online" : "offline"}</p>
              </div>
            </Link>

            <div className="w-[98%] chatting-message-box flex flex-col justify-start gap-3 py-3 overflow-auto flex-1 text-gray-600 dark:text-white" ref={messageRef}>

            </div>

            <form className='flex items-center justify-center w-[98%] absolute bottom-2 bg-ed-500 gap-2 bg-blue-900/20 rounded-md overflow-hidden shadow-[0_0_1px_black_inset] focus-within:shadow-[0_0_3px_black_inset] dark:shadow-[0_0_1px_white_inset] dark:focus-within:shadow-[0_0_3px_white_inset]' onSubmit={handleSendNewMessage}>
              <input className='w-full overflow-auto flex-1 pl-4 pr-1 py-2 outline-none bg-transparent text-gray-950 dark:text-white' placeholder="Enter your message" type='text' value={message} onChange={e => setMessage(e.target.value)} required />
              <button className="cursor-pointer px-4 md:px-7 py-2 bg-blue-900/80 hover:bg-blue-900 font-semibold hover:text-yellow-500 text-gray-100 active:bg-violet-950 shadow-[0_0_1px_black_inset] focus-within:shadow-[0_0_3px_black_inset] dark:shadow-[0_0_1px_white_inset] dark:focus-within:shadow-[0_0_3px_white_inset]" >
                <FontAwesomeIcon size="sm" icon={faPaperPlane} className='h-6' />
              </button>
            </form>

          </div>
          :
          <LoginForm />
      }
    </div>
  );
}
