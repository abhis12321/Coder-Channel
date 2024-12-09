import Link from "next/link";
import Image from "next/image";
import { useAuth } from "./AuthProvider";
import { useEffect, useState } from "react";

export default function ChatBarUser({ sender }) {
    const { user, socket } = useAuth();
    const [onlineStatus, setOnlineStatus] = useState(sender?._id === user?._id);

    const handleStatus = ({ _id, status }) => {
        if (sender._id == _id) {
            setOnlineStatus(status);
        }
    }

    const handleExistingOnlineUsers = (onlineUsersId) => {
        const set = new Set(onlineUsersId);
        if (set.has(sender._id)) {
            setOnlineStatus(true);
        }
    }

    useEffect(() => {
        socket?.on("online-status", handleStatus);
        socket?.on("existingOnline", handleExistingOnlineUsers);
        return () => {
            socket?.off("online-status", handleStatus);
            socket?.off("existingOnline", handleExistingOnlineUsers);
        }
    }, [socket]);

    return (
        <Link href={`/chat/${sender?._id}`} className={`w-full py-[2px] px-1 md:px-2 rounded flex gap-2 items-center bg-gray-600/20 dark:bg-black/20 hover:bg-cyan-700/50 dark:hover:bg-cyan-600/15 group hover:scale-105 duration-300`}>
            <Image src={sender?.imgUrl} alt='' height={50} width={50} className='w-10 aspect-square rounded-full' />
            <span className="flex flex-col">
                <span className="font-semibold group-hover:underline text-nowrap">{sender?.name}</span>
                <span className="text-xs font-light text-nowrap">@{sender?.university}</span>

                <div className={`text-xs font-bold ${onlineStatus ? "text-green-700" : "text-red-700"} flex items-center gap-1`}>
                    <div className={`h-[6px] w-[6px] rounded-full bg-${onlineStatus ? "green" : "red"}-700 relative top-[1px]`} />
                    <span className="">{onlineStatus ? "online" : "offline"}</span>
                </div>
            </span>
        </Link>
    )
}
