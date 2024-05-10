import React from "react";
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
import A from ".//profile.jpg";


export default function Card({ student }) {
  return (
    <div className="bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-4 px-4 h-[440px] w-[320px] shadow-[0_0_6px_black] dark:shadow-[0_0_10px_white] hover:shadow-[0_0_10px_indigo] dark:hover:shadow-[0_0_15px_red] rounded-lg flex flex-col justify-evenly items-center gap-3">
      <div className="">
        <Image
          src={A}
          alt="profile-img"
          className={`h-[140px] m-auto rounded-full overflow-hidden border-4 ${student.isOnline ? 'border-lime-900 dark:border-green-700' : 'border-red-900 dark:border-red-700'} opacity-80`}
          width={140}
          height={140}
        />
      </div>
      <div className="text-2xl font-bold text-red-950 dark:text-gray-50">
        {student.name}
      </div>
      <div className="text-center text-gray-50 dark:text-slate-400 drop-shadow-[0_0_3px_black]">
        {student.university}
      </div>
      <div className="flex justify-center items-center gap-8">
        <Link href={`/students`}>
          <FontAwesomeIcon
            icon={faInstagram}
            size="2x"
            className="hover:scale-110 text-rose-800"
          />
        </Link>
        <Link href={`/students`}>
          <FontAwesomeIcon
            icon={faLinkedin}
            size="2x"
            className="hover:scale-110 text-blue-700 "
          />
        </Link>
        <Link href={`/students`}>
          <FontAwesomeIcon
            icon={faGithub}
            size="2x"
            className="hover:scale-110 text-gray-900 dark:text-gray-400"
          />
        </Link>
      </div>
      <div className="flex items-center justify-center gap-6 font-serif">
        <button className="w-[100px] text-center py-[8px] rounded-lg bg-lime-900/80 hover:bg-lime-900/95 dark:bg-green-700 dark:hover:bg-green-600 font-mn text-gray-200">
          follow
        </button>
        <Link
          href={`chat/${student._id}`}
          className="w-[100px] text-center py-[8px] rounded-lg bg-lime-900/80 hover:bg-lime-900/95 dark:bg-green-700 dark:hover:bg-green-600 font-mn text-gray-200"
        >
          Message
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <FontAwesomeIcon
          icon={faHeart}
          size="1x"
          className=" text-rose-700 hover:drop-shadow-[0_0_2px_black] dark:hover:drop-shadow-[0_0_2px_yellow] opacity-100 py-[2px] px-[50%] h-6 cursor-pointer  "
        />
        <div className="border-x-2 border-gray-600 flex items-center justify-center px-[50%]">
          <FontAwesomeIcon
            icon={faMicroscope}
            size="1x"
            className="text-blue-700 hover:drop-shadow-[0_0_1px_black] dark:hover:drop-shadow-[0_0_2px_yellow] opacity-100 py-[2px] h-6 cursor-pointer  "
          />
        </div>
        <FontAwesomeIcon
          icon={faShareNodes}
          size="1x"
          className="text-gray-800 dark:text-gray-400 hover:drop-shadow-[0_0_1px_red] dark:hover:drop-shadow-[0_0_2px_yellow] opacity-100 py-[2px] px-[50%] h-6 cursor-pointer  "
        />
      </div>
    </div>
  );
}
