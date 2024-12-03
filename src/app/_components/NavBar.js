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
} from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const rightNav = useRef(null);

  const handleRight = () => {
    rightNav.current.classList.toggle("-right-20")
    rightNav.current.classList.toggle("right-1")
  };

  const handleHideRight = () => {
    if (!rightNav.current.classList.contains("-right-20")) {
      handleRight();
    }
  };

  return (
    <div className="h-16 py-2 px-[4%] sm:px-8 md:px-10 lg:px-12 fixed top-0 left-0 z-[90] w-full bg-white dark:bg-blue-900 text-gray-500 dark:text-gray-50 font-semibold flex items-center justify-between shadow-[0_0_1px_black] dark:shadow-[0_0_1px_white]">
      <div className="drop-shadow-[0_0_1px_black]">
        <Link href={'/'} className="font-extrabold italic text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-gray-400 w-fit overflow-hidden px-1 font-serif">
          #CoderMedia
        </Link>
      </div>

      <div className="min-w-[60px] pb-2 lg:pb-0 rounded-[1.55rem] lg:rounded-none fixed lg:static top-[20vh] -right-20 lg:flex gap-8 bg-white dark:bg-indigo-950/60 lg:bg-transparent dark:lg:bg-transparent z-10 items-center dark:font-normal font-medium shadow-[-.3px_.3px_1.5px_black_inset] lg:shadow-none dark:shadow-white duration-300 backdrop-blur-md lg:backdrop-blur-none" ref={rightNav}>

        <Link
          href="/"
          className="w-full text-2xl overflow-hidden flex items-center justify-center lg:rounded-lg hover:bg-gray-500 hover:text-white dark:hover:bg-gray-200/15 dark:lg:hover:ring-2 dark:ring-gray-100 py-4 lg:py-[13px] lg:px-[18px] rounded-t-[1.7rem]"
        >
          <FontAwesomeIcon icon={faHome} size="sm" className="h-[23px] scale-110" />
        </Link>

        <Link
          href="/students"
          className="w-full text-2xl overflow-hidden flex items-center justify-center lg:rounded-lg hover:bg-gray-500 hover:text-white dark:hover:bg-gray-200/15 dark:lg:hover:ring-2 dark:ring-gray-100 py-4 lg:py-[13px] lg:px-[18px]"
        >
          <FontAwesomeIcon icon={faUserGroup} size="sm" className="h-[23px] scale-110" />
        </Link>

        <Link
          href="/chat"
          className="w-full text-2xl overflow-hidden flex items-center justify-center lg:rounded-lg hover:bg-gray-500 hover:text-white dark:hover:bg-gray-200/15 dark:lg:hover:ring-2 dark:ring-gray-100 py-4 lg:py-[13px] lg:px-[18px]"
        >
          <FontAwesomeIcon icon={faPaperPlane} size="sm" className="h-[23px] scale-110" />
        </Link>

        <Link
          href="/login"
          className="w-full text-2xl overflow-hidden flex items-center justify-center lg:rounded-lg hover:bg-gray-500 hover:text-white dark:hover:bg-gray-200/15 dark:lg:hover:ring-2 dark:ring-gray-100 py-4 lg:py-[13px] lg:px-[18px]"
        >
          <FontAwesomeIcon icon={faUser} size="sm" className="h-[23px] scale-110 scale-x-110" />
        </Link>

        <div className="h-[45px]">
          <ToggleMode />
        </div>

      </div>

      <button className="lg:hidden text-3xl py-2" onBlur={handleHideRight}>
        <FontAwesomeIcon
          icon={faBars}
          size="sm"
          className="h-[23px] cursor-pointer text-gray-500 dark:text-gray-300"
          onClick={handleRight}
        />
      </button>
    </div>
  );
}
