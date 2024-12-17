"use client"
import Link from "next/link";
import Image from "next/image";
import CopyLink from "./CopyLink";
import { useAuth } from "./AuthProvider";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faStar as faSolidStar,
  faShareNodes,
  faMicroscope,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";


export default function StudentCard({ student, index, handleFollowings, search, searchBy, loadUsers }) {
  const { socket, user } = useAuth();
  const [copyLink, setCopyLink] = useState(0)
  const [onlineStatus, setOnlineStatus] = useState(false);

  const handleStatus = ({ _id, status }) => {
    if (student?._id == _id) {
      setOnlineStatus(status);
    }
  }

  const handleExistingOnlineUsers = (onlineUsersId) => {
    const set = new Set(onlineUsersId);
    if (set.has(student?._id)) {
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

  const handleFollowers = () => {
    let data = {
      followedById: user?._id,
      followedByName: user?.name,
      followedToId: student?._id,
      followedToName: student?.name
    };
    handleFollowings(index, data);
  }

  const handleProfileLike = () => {
    if (!user) {
      alert("login first");
    } else {
      axios.post('/api/users/likes', { likedById: user?._id, likedToId: student?._id })
        .then(res => res.data)
        .catch(error => console.error(error.message))
        .finally(() => loadUsers());
    }
  }


  return (
    <div className={`h-[440px] w-[320px] py-4 px-4 rounded-lg bg-white dark:bg-gray-800 dark:hover:bg-blue-400/15 backdrop-blur-lg shadow-[0_0_2px_black] dark:shadow-[0_0_2px_white] hover:shadow-[.2px_1.5px_4px_indigo] dark:hover:shadow-[.5px_1px_4px_yellow] flex flex-col justify-evenly items-center gap-3 ${searchBy == "0" && !student?.name.toLowerCase().includes(search) && "hidden"}  ${searchBy == "1" && !student?.university.toLowerCase().includes(search) && "hidden"}`}>
      <div className="relative">
        <Image
          src={(student?.imgUrl)}
          alt="profile-img"
          className={`h-[140px] m-auto rounded-full overflow-hidden ring-[3px] ${onlineStatus ? 'ring-lime-900 dark:ring-green-800' : 'ring-red-900 dark:ring-red-700'} opacity-90 bg-white aspect-square`}
          width={140}
          height={140}
          name="profile-image"
        />
        <span className="absolute bottom-3 right-4 flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${onlineStatus && "dark:bg-green-800 bg-lime-900"} `}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 ${onlineStatus ? "dark:bg-green-600 bg-lime-700 border-lime-800 dark:border-green-700" : "bg-rose-700 border-red-900"} border-2`}></span>
        </span>
      </div>
      <div className="text-2xl font-bold text-red-950 dark:text-gray-50">
        {student?.name}
      </div>
      <div className="text-center font-semibold dark:font-normal text-gray-600 dark:text-white/80" name="university-name">
        {student?.university}
      </div>
      <div className="flex justify-center items-center gap-8">
        <Link href={student?.linkedIn || ""} target="_blank" className={`${!student?.linkedIn ? "pointer-events-none text-gray-500/20" : "hover:scale-110 text-blue-700"}`} name="linkedin-profile">
          <FontAwesomeIcon
            icon={faLinkedin}
            size="2x"
            className=" "
          />
        </Link>
        <Link href={student?.github || ""} target="_blank" className={`${!student?.github ? "pointer-events-none text-gray-500/20" : "hover:scale-110 text-slate-700 dark:text-gray-300"}`} name="github-account">
          <FontAwesomeIcon
            icon={faGithub}
            size="2x"
            className=""
          />
        </Link>
        <Link href={student?.instagram || ""} target="_blank" className={`${!student?.instagram ? "pointer-events-none text-gray-500/20" : "hover:scale-110 text-rose-800"}`} name="instagram-account">
          <FontAwesomeIcon
            icon={faInstagram}
            size="2x"
            className=""
          />
        </Link>
      </div>
      <div className="flex items-center justify-center gap-6 font-sans text-[12px] font-semibold tracking-wider">
        <button className="w-[100px] text-center py-[6px] rounded-lg bg-lime-900/80 hover:bg-lime-800/95 dark:bg-green-800/80 dark:hover:bg-green-600/80 text-white" onClick={handleFollowers} name="follow-button">
          {student?.isFollowing ? "following" : "follow"}
        </button>
        <Link
          href={`chat/${student?._id}`} name="personal-message"
          className="w-[100px] text-center py-[6px] rounded-lg bg-lime-900/80 hover:bg-lime-800/95 dark:bg-green-800/80 dark:hover:bg-green-600/80 text-white"
        >
          Message
        </Link>
      </div>
      <div className="flex items-center justify-center">
        {
          student?.isLiked ?
            <FontAwesomeIcon
              icon={faSolidStar}
              size="1x"
              className={`hover:scale-110 duration-300 active:text-violet-700 text-yellow-600 hover:drop-shadow-[1px_1px_1px_black] py-[2px] px-[50%] h-6 cursor-pointer`}
              onClick={handleProfileLike}
            />
            :
            <FontAwesomeIcon
              icon={faRegularStar}
              size="1x"
              className={`hover:scale-110 duration-300 active:text-violet-700 text-yellow-700/80 hover:text-yellow-600 hover:drop-shadow-[1px_1px_1px_black] py-[2px] px-[50%] h-6 cursor-pointer`}
              onClick={handleProfileLike}
            />}
        <div className="border-x-2 border-gray-600 flex items-center justify-center px-[50%]">
          <Link href={`/students/${student?._id}`} name="view-profile">
            <FontAwesomeIcon
              icon={faMicroscope}
              size="1x"
              className="hover:scale-110 duration-300 active:text-violet-700 text-blue-700 hover:drop-shadow-[1px_1px_1px_green] dark:hover:drop-shadow-[0_0_2px_yellow] opacity-100 py-[2px] h-6 cursor-pointer"
            />
          </Link>
        </div>
        <FontAwesomeIcon
          icon={faShareNodes}
          name="share-profile"
          size="1x"
          className="hover:scale-110 duration-300 active:text-violet-700 text-gray-700/90 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:drop-shadow-[1px_1px_1px_green] dark:hover:drop-shadow-[0_0_2px_black] opacity-100 py-[2px] px-[50%] h-[25px] cursor-pointer"
          onClick={e => setCopyLink(1)}
        />
      </div>

      {
        copyLink != 0 && <CopyLink url={`/students/${student?._id}`} setCopyLink={setCopyLink} copyLink={copyLink} />
      }
    </div>
  );
}
