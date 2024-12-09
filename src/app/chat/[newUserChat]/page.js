"use client"
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LoginForm from "../../_components/LoginForm";
import { ChatModel } from "../../_components/ChatModel";
import { useAuth } from "../../_components/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ErrorPage from "@/app/_components/ErrorPage";
import LoadingPage from "@/app/_components/LoadingPage";


export default function Page({ params }) {
  const messageRef = useRef();
  const { socket, user } = useAuth();
  const [error, setError] = useState(false);
  const [sender, setSender] = useState();
  const [message, setMessage] = useState("");
  const [onlineStatus, setOnlineStatus] = useState(false);

  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  const handleOnlineStatus = ({ _id, status }) => {
    if (params.newUserChat == _id) {
      setOnlineStatus(status);
    }
  }

  const handleReceiveMessage = async ({ message, senderId, receiverId, senderName }) => {
    if (senderId == params.newUserChat && receiverId == user?._id) {
      appendNewMessageToCant(senderName, message, "left");
    }
  }

  const handleSendNewMessage = (e) => {
    e.preventDefault();
    let data = {
      senderId: user?._id,
      senderName: user?.name,
      receiverId: params.newUserChat,
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


  const handleEnistingOnlineUsers = (onlineUsersId) => {
    const set = new Set(onlineUsersId);
    if (set.has(params.newUserChat)) {
      setOnlineStatus(true);
    }
  }

  useEffect(() => {
    socket?.on("online-status", handleOnlineStatus);
    socket?.on("existingOnline", handleEnistingOnlineUsers);
    socket?.on("receivePersonalMessage", handleReceiveMessage);

    return () => {
      socket?.off("online-status", handleOnlineStatus);
      socket?.off("existingOnline", handleEnistingOnlineUsers);
      socket?.off("receivePersonalMessage", handleReceiveMessage);
    }
  }, [socket]);


  useEffect(() => {
    socket?.emit("loadOnlineUsers", params.newUserChat);
    loadUser();
    loadChats();
  }, [user?._id, params?.newUserChat]);

  const loadUser = () => {
    axios.get(`/api/single-user/${params.newUserChat}`)
      .then(res => res.data)
      .then(data => {
        if (data.success) {
          setSender(data.user);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }

  const loadChats = () => {
    let payload = { tempUserId: params?.newUserChat, mainUserId: user?._id }
    if (payload.mainUserId && payload.tempUserId) {
      axios.put('/api/chatLog', payload)
        .then(response => response.data)
        .then(data => {
          if (data.success) {
            data.chats?.map(chat => {
              let flag = chat.receiverId._id === user?._id;
              appendNewMessageToCant(flag ? chat.senderId.name : "you", chat.message, flag ? 'left' : 'right');
            })
          }
        })
        .catch(error => console.error(error.message))
    }
  }

  const appendNewMessageToCant = (sender, message, direction) => {
    let content = ChatModel(sender, message, direction);
    messageRef.current.appendChild(content);
    scrollToBottom();
  }

  return (
    <>
      {
        error ?
          <ErrorPage />
          :
          <div className='h-nav w-full flex items-center justify-center'>
            {
              !sender ?
                <LoadingPage />
                :
                user ?
                  <div className="text-white rounded-md bg-white dark:bg-gray-800 dark:text-white w-full max-w-[900px] mx-auto pt-2 pb-12 overflow-hidden relative h-nav shadow-[0_0_2px_gray] flex flex-col items-center justify-start" >
                    <Link href={`/students/${params.newUserChat}`} className={`w-[98%] bg-green-950/10 dark:bg-gray-950/20 ${onlineStatus ? 'shadow-[0_0_3px_green_inset] hover:bg-lime-800/20' : 'shadow-[0_0_3px_red_inset] hover:bg-red-800/20'} rounded-md pl-4 p-2 mx-4 md:mx-9 flex items-center gap-4 md:gap-6 hover:animate-pulse overflow-x-hidden`}>
                      <Image src={sender?.imgUrl ? sender?.imgUrl : "/img/profileImg.jpg"} alt="image" height={70} width={70} className={`rounded-full w-16 h-16 ring-2 ${onlineStatus ? "ring-green-600" : "ring-red-800"}`} />
                      <div className="flex flex-col">
                        <div className={`relative text-2xl font-semibold text-nowrap  ${onlineStatus ? 'drop-shadow-[1px_1px_1px_green]' : 'drop-shadow-[1px_1px_1px_red]'}`}>
                          {sender?.name}
                          <p onClick={handleReceiveMessage} className={`absolute top-0 text-[8px] font-semibold px-1 py-0 leading-4 inline-flex rounded-full ${onlineStatus ? "dark:bg-green-800 bg-lime-900" : "dark:bg-red-800 bg-red-900"} `}>{onlineStatus ? "online" : "offline"}</p>
                        </div>
                        <div className={`relative text-xs text-nowrap  ${onlineStatus ? 'drop-shadow-[1px_1px_1px_green]' : 'drop-shadow-[1px_1px_1px_red]'}`}>
                          (@{sender?.university})
                        </div>
                      </div>
                    </Link>

                    <div className="w-full px-[1%] max-h-[72.5vh] flex flex-col justify-start gap-3 py-3 overflow-auto flex-1 text-gray-600 dark:text-white new-scroll" ref={messageRef}> </div>

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
      }
    </>
  );
}
