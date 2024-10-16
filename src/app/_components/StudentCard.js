"use client"
import Link from "next/link";
import Image from "next/image";
import CopyLink from "./CopyLink";
import { useAuth } from "./AuthProvider";
import React, { useCallback, useEffect, useState } from "react";
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


export default function StudentCard({ student, index , handleFollowings , search , searchBy} ) {
  const USER = useAuth();
  const socket = USER.socket;
  const [status, setStatus] = useState(student.isOnline);
  const [copyLink , setCopyLink] = useState(0)

  const handleStatus = useCallback(({ _id, status }) => {
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

  const handleFollowers = () => {
    let data = {
      followedById: USER?.user?._id,
      followedByName: USER?.user?.name,
      followedToId: student?._id,
      followedToName: student?.name
    };
    handleFollowings(index , data);
  }


  return (
    <div className={`bg-white dark:bg-[#1D2129] dark:hover:bg-slate-900/90 backdrop-blur-lg py-4 px-4 h-[440px] w-[320px] shadow-[0_0_2px_black] dark:shadow-[0_0_2px_white] hover:shadow-[0_0_4px_indigo] dark:hover:shadow-[0_0_4px_pink] rounded-lg flex flex-col justify-evenly items-center gap-3 ${searchBy == "0" && !student.name.toLowerCase().includes(search) && "hidden"}  ${searchBy == "1" && !student.university.toLowerCase().includes(search) && "hidden"}`}>
      <div className="relative">
        <Image
          src={(student.imgUrl)}
          alt="profile-img"
          className={`h-[140px] m-auto rounded-full overflow-hidden ring-[3px] ${status ? 'ring-lime-900 dark:ring-green-800' : 'ring-red-900 dark:ring-red-700'} opacity-90 bg-white aspect-square`}
          width={140}
          height={140}
          name="profile-image"
        />
        <span className="absolute bottom-3 right-4 flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status && "dark:bg-green-800 bg-lime-900"} `}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 ${status ? "dark:bg-green-600 bg-lime-700 border-lime-800 dark:border-green-700" : "bg-rose-700 border-red-900"} border-2`}></span>
        </span>
      </div>
      <div className="text-2xl font-bold text-red-950 dark:text-gray-50">
        {student.name}
      </div>
      <div className="text-center font-semibold dark:font-normal text-gray-600 dark:text-white/80" name="university-name">
        {student.university}
      </div>
      <div className="flex justify-center items-center gap-8">
        <Link href={student.linkedIn} className={`${!student.linkedIn ? "pointer-events-none text-gray-500/20" : "hover:scale-110 text-blue-700"}`} name="linkedin-profile">
          <FontAwesomeIcon
            icon={faLinkedin}
            size="2x"
            className=" "
          />
        </Link>
        <Link href={student.github} className={`${!student.github ? "pointer-events-none text-gray-500/20" : "hover:scale-110 text-slate-700 dark:text-gray-300"}`} name="github-account">
          <FontAwesomeIcon
            icon={faGithub}
            size="2x"
            className=""
          />
        </Link>
        <Link href={student.instagram} className={`${!student.instagram ? "pointer-events-none text-gray-500/20" : "hover:scale-110 text-rose-800"}`} name="instagram-account">
          <FontAwesomeIcon
            icon={faInstagram}
            size="2x"
            className=""
          />
        </Link>
      </div>
      <div className="flex items-center justify-center gap-6 font-sans text-[12px] font-semibold tracking-wider">
        <button className="w-[100px] text-center py-[6px] rounded-lg bg-lime-900/80 hover:bg-lime-800/95 dark:bg-green-800/80 dark:hover:bg-green-600/80 text-white" onClick={handleFollowers} name="follow-button">
          {student.isFollowing ? "following" : "follow"}
        </button>
        <Link
          href={`chat/${student._id}`} name="personal-message"
          className="w-[100px] text-center py-[6px] rounded-lg bg-lime-900/80 hover:bg-lime-800/95 dark:bg-green-800/80 dark:hover:bg-green-600/80 text-white"
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
          <Link href={`/students/${student._id}`} name="view-profile">
            <FontAwesomeIcon
              icon={faMicroscope}
              size="1x"
              className="text-blue-700 hover:drop-shadow-[1px_1px_1px_green] dark:hover:drop-shadow-[0_0_2px_yellow] opacity-100 py-[2px] h-6 cursor-pointer"
            />
          </Link>
        </div>
        <FontAwesomeIcon
          icon={faShareNodes}
          name="share-profile"
          size="1x"
          className="text-gray-800 dark:text-gray-400 hover:drop-shadow-[1px_1px_1px_green] dark:hover:drop-shadow-[0_0_2px_yellow] opacity-100 py-[2px] px-[50%] h-6 cursor-pointer"
          onClick={e => setCopyLink(1)}
        />
      </div>

      {        
        copyLink != 0 && <CopyLink text={`http://13.201.72.123/students/${student?._id}`} setCopyLink={setCopyLink} copyLink={copyLink}/>
      }      
    </div>
  );
}
