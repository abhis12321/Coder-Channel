"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faPaperPlane,
  faUser,
  faUserGroup,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ToggleMode from "./ToggleMode";

export default function NavBar() {
  const handleRight = () => {
    document.querySelector(".right-navbar").classList.toggle("hidden");
    document.querySelector(".cutX").classList.toggle("hidden");
    document.querySelector(".hamberger").classList.toggle("hidden");
  };

  return (
    <div className="sticky top-0 left-0 z-50 w-full bg-gradient-to-b from-gray-600 to-gray-800 dark:from-blue-900 dark:to-blue-900 text-gray-50 font-semibold flex items-center justify-between h-16 py-2 px-4 xm:px-8 md:px-12 overflow-hidden">
      <div className="drop-shadow-[0_0_1px_red]">
        <h1 className="font-extrabold italic text-3xl text-center rounded-md text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-100 w-fit leading-[4rem] overflow-hidden">
          Coder&apos;media
        </h1>
      </div>

      <div className="right-navbar fixed lg:static top-0 right-0 hidden lg:flex gap-8 bg-gradient-to-r lg:[background:none] from-gray-700 to-gray-600  dark:from-blue-900 dark:to-blue-950 min-h-[100vh] lg:min-h-fit z-10 items-center min-w-[170px] dark:font-normal font-medium border-l-[1px] lg:border-0 border-gray-400">
        <div className="text-4xl pt-[15px] pb-2 text-center"  >
          <FontAwesomeIcon icon={faXmark} size="sm" className="hidden hover:text-red-800 cursor-pointer cutX" onClick={handleRight}/>
        </div>

        <div className="w-full lg:w-fit flex items-center justify-center">
          <Link
            href="/"
            className="w-full text-2xl overflow-hidden flex items-center justify-center lg:rounded-lg hover:bg-slate-950/30 hover:text-white dark:hover:bg-gray-200/15 lg:hover:ring-2 ring-gray-100 py-4 lg:py-[13px] lg:px-4"
          >
            <FontAwesomeIcon icon={faHome} size="sm" className="scale-110"/>
          </Link>
        </div>

        <div className="w-full lg:w-fit flex items-center justify-center">
          <Link
            href="/students"
            className="w-full text-2xl overflow-hidden flex items-center justify-center lg:rounded-lg hover:bg-slate-950/30 hover:text-white dark:hover:bg-gray-200/15 lg:hover:ring-2 ring-gray-100 py-4 lg:py-[13px] lg:px-[15px]"
          >
            <FontAwesomeIcon icon={faUserGroup} size="sm" className="scale-110"/>
          </Link>
        </div>

        <div className="w-full lg:w-fit flex items-center justify-center">
          <Link
            href="/chat"
            className="w-full text-2xl overflow-hidden flex items-center justify-center lg:rounded-lg hover:bg-slate-950/30 hover:text-white dark:hover:bg-gray-200/15 lg:hover:ring-2 ring-gray-100 py-4 lg:py-[13px] lg:px-[17px]"
          >
            <FontAwesomeIcon icon={faPaperPlane} size="sm" className="scale-110"/>
          </Link>
        </div>

        <div className="w-full lg:w-fit flex items-center justify-center">
          <Link
            href="/login"
            className="w-full text-2xl overflow-hidden flex items-center justify-center lg:rounded-lg hover:bg-slate-950/30 hover:text-white dark:hover:bg-gray-200/15 lg:hover:ring-2 ring-gray-100 py-4 lg:py-[13px] lg:px-[19px]"
          >
            <FontAwesomeIcon icon={faUser} size="sm" className="scale-110"/>
          </Link>
        </div>
        <ToggleMode />
      </div>

      <div className="lg:hidden text-3xl py-2">
        <FontAwesomeIcon
          icon={faBars}
          size="sm"
          className="hamberger cursor-pointer text-gray-50 dark:text-gray-400"
          onClick={handleRight}
        />
      </div>
    </div>
  );
}
