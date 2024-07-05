"use client"
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHeart,
  faShareNodes,
  faMicroscope,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAuth } from "./AuthProvider";


export default function StudentCard({ student, index , handleFollowings } ) {
  const USER = useAuth();
  const socket = USER.socket;
  const [status, setStatus] = useState(student.isOnline);

  const handleStatus = useCallback(({ _id, status }) => {
    // console.log("haha..", status , _id);
    if (student._id == _id) {
      setStatus(status);
    }
  }, [student]);


  useEffect(() => {
    socket?.on("online-status", handleStatus);
    return () => {
      socket?.off("online-status", handleStatus);
    }
  }, [socket, USER, handleStatus]);

  useEffect(() => {
    setStatus(student.isOnline);
  }, [student._id, student]);

  const handleCopyURL = e => {
    navigator.clipboard.writeText(`https://coder-media.onrender.com//students/${student?._id}`);
    alert('profile url copied')
  }

  const handleFollowers = () => {
    let data = {
      followedById: USER?.user?._id,
      followedByName: USER?.user?.name,
      followedToId: student?._id,
      followedToName: student?.name
    };
    handleFollowings(student , index , data);
  }

  return (
    <div className="bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-4 px-4 h-[440px] w-[320px] shadow-[0_0_6px_black] dark:shadow-[0_0_6px_white] hover:shadow-[0_0_10px_indigo] dark:hover:shadow-[0_0_10px_violet] rounded-lg flex flex-col justify-evenly items-center gap-3">
      <div className="relative">
        <Image
          src={student.imgUrl ? student.imgUrl : "/img/profileImg.jpg"}
          alt="profile-img"
          className={`h-[140px] m-auto rounded-full overflow-hidden ring-4 ${status ? 'ring-lime-900 dark:ring-green-700' : 'ring-red-900 dark:ring-red-700'} opacity-80 bg-white`}
          width={140}
          height={140}
        />
        <span className="absolute bottom-3 right-4 flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status && "dark:bg-green-800 bg-lime-900"} `}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 ${status ? "dark:bg-green-600 bg-lime-700 border-lime-800 dark:border-green-700" : "bg-rose-700 border-red-900"} border-2`}></span>
        </span>
      </div>
      <div className="text-2xl font-bold text-red-950 dark:text-gray-50">
        {student.name}
      </div>
      <div className="text-center text-gray-50 dark:text-slate-400 drop-shadow-[0_0_3px_black]">
        {student.university}
      </div>
      <div className="flex justify-center items-center gap-8">
        <Link href={student.linkedIn} className={`${!student.linkedIn && "pointer-events-none opacity-70"}`}>
          <FontAwesomeIcon
            icon={faLinkedin}
            size="2x"
            className="hover:scale-110 text-blue-700 "
          />
        </Link>
        <Link href={student.github} className={`${!student.github && "pointer-events-none opacity-70"}`}>
          <FontAwesomeIcon
            icon={faGithub}
            size="2x"
            className="hover:scale-110 text-gray-900 dark:text-gray-400"
          />
        </Link>
        <Link href={student.instagram} className={`${!student.instagram && "pointer-events-none opacity-70"}`}>
          <FontAwesomeIcon
            icon={faInstagram}
            size="2x"
            className="hover:scale-110 text-rose-800"
          />
        </Link>
      </div>
      <div className="flex items-center justify-center gap-6 font-serif">
        <button className="w-[100px] text-center py-[6px] rounded-lg bg-lime-900/80 hover:bg-lime-900/95 dark:bg-green-800 dark:hover:bg-green-600 font-mn text-gray-200" onClick={handleFollowers}>
          {student.isFollowing ? "following" : "follow"}
        </button>
        <Link
          href={`chat/${student._id}`}
          className="w-[100px] text-center py-[6px] rounded-lg bg-lime-900/80 hover:bg-lime-900/95 dark:bg-green-800 dark:hover:bg-green-600 font-mn text-gray-200"
        >
          Message
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <FontAwesomeIcon
          icon={faHeart}
          size="1x"
          className=" text-rose-700 hover:drop-shadow-[1px_1px_1px_green] dark:hover:drop-shadow-[0_0_2px_yellow] opacity-100 py-[2px] px-[50%] h-6 cursor-pointer  "
        />
        <div className="border-x-2 border-gray-600 flex items-center justify-center px-[50%]">
          <Link href={`/students/${student._id}`}>
            <FontAwesomeIcon
              icon={faMicroscope}
              size="1x"
              className="text-blue-700 hover:drop-shadow-[1px_1px_1px_green] dark:hover:drop-shadow-[0_0_2px_yellow] opacity-100 py-[2px] h-6 cursor-pointer  "
            />
          </Link>
        </div>
        <FontAwesomeIcon
          icon={faShareNodes}
          size="1x"
          className="text-gray-800 dark:text-gray-400 hover:drop-shadow-[1px_1px_1px_green] dark:hover:drop-shadow-[0_0_2px_yellow] opacity-100 py-[2px] px-[50%] h-6 cursor-pointer  "
          onClick={handleCopyURL}
        />
      </div>
      
    </div>
  );
}
