"use client";
import Link from "next/link";
import { useRef } from "react";
import ToggleMode from "./ToggleMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faPaperPlane,
  faUser,
  faUserGroup,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const rightNav = useRef(null);

  const handleRight = () => {
    rightNav.current.classList.toggle("-right-full")
  };

  return (
    <div className="sticky top-0 left-0 z-[90] w-full bg-white dark:bg-blue-900 text-gray-500 dark:text-gray-50 font-semibold flex items-center justify-between h-16 py-2 px-[4%] sm:px-8 md:px-10 lg:px-12 shadow-[0_0_2px_gray] backdrop-blur-lg">
      <div className="drop-shadow-[0_0_1px_black]">
        <Link href={'/'} className="font-extrabold italic text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-gray-400 w-fit overflow-hidden px-1 font-serif">
          #CoderMedia
        </Link>
      </div>

      <div className="min-w-[70px] pb-2 lg:pb-0 rounded-[1.7rem] lg:rounded-none fixed lg:static top-[20vh] right-0 -right-full lg:flex gap-8 bg-white dark:bg-indigo-950/50 lg:bg-transparent dark:lg:bg-transparent z-10 items-center dark:font-normal font-medium shadow-[-.5px_.3px_1px_black] lg:shadow-none dark:shadow-white duration-300" ref={rightNav}>
        <div className="text-4xl pt-[9px] pb-[5.5px] text-center lg:hidden" onClick={handleRight}>
          <FontAwesomeIcon icon={faXmark} size="sm" className="h-[31px] hover:text-red-800 cursor-pointer"/>
        </div>

        <div className="w-full lg:w-fit flex items-center justify-center">
          <Link
            href="/"
            className="w-full text-2xl overflow-hidden flex items-center justify-center lg:rounded-lg hover:bg-gray-500 hover:text-white dark:hover:bg-gray-200/15 dark:lg:hover:ring-2 dark:ring-gray-100 py-4 lg:py-[13px] lg:px-4"
          >
            <FontAwesomeIcon icon={faHome} size="sm" className="h-[23px] scale-110"/>
          </Link>
        </div>

        <div className="w-full lg:w-fit flex items-center justify-center">
          <Link
            href="/students"
            className="w-full text-2xl overflow-hidden flex items-center justify-center lg:rounded-lg hover:bg-gray-500 hover:text-white dark:hover:bg-gray-200/15 dark:lg:hover:ring-2 dark:ring-gray-100 py-4 lg:py-[13px] lg:px-[15px]"
          >
            <FontAwesomeIcon icon={faUserGroup} size="sm" className="h-[23px] scale-110"/>
          </Link>
        </div>

        <div className="w-full lg:w-fit flex items-center justify-center">
          <Link
            href="/chat"
            className="w-full text-2xl overflow-hidden flex items-center justify-center lg:rounded-lg hover:bg-gray-500 hover:text-white dark:hover:bg-gray-200/15 dark:lg:hover:ring-2 dark:ring-gray-100 py-4 lg:py-[13px] lg:px-[17px]"
          >
            <FontAwesomeIcon icon={faPaperPlane} size="sm" className="h-[23px] scale-110"/>
          </Link>
        </div>

        <div className="w-full lg:w-fit flex items-center justify-center">
          <Link
            href="/login"
            className="w-full text-2xl overflow-hidden flex items-center justify-center lg:rounded-lg hover:bg-gray-500 hover:text-white dark:hover:bg-gray-200/15 dark:lg:hover:ring-2 dark:ring-gray-100 py-4 lg:py-[13px] lg:px-[19px]"
          >
            <FontAwesomeIcon icon={faUser} size="sm" className="h-[23px] scale-110 scale-x-110"/>
          </Link>
        </div>
        <ToggleMode />
      </div>

      <div className="lg:hidden text-3xl py-2">
        <FontAwesomeIcon
          icon={faBars}
          size="sm"
          className="h-[23px] cursor-pointer text-gray-500 dark:text-gray-300"
          onClick={handleRight}
        />
      </div>
    </div>
  );
}
