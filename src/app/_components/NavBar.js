"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faPaperPlane,
  faStaffSnake,
  faUser,
  faUserGroup,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ToggleMode from "./ToggleMode";

export default function NavBar() {
  let USER = useAuth();

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data != null) {
      USER.login(data);
    }
  }, []);

  const handleRight = () => {
    document.querySelector(".right-navbar").classList.toggle("hidden");
    document.querySelector(".cutX").classList.toggle("hidden");
    document.querySelector(".hamberger").classList.toggle("hidden");
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-400 to-slate-500 dark:from-slate-950 dark:to-slate-800 text-gray-300 font-semibold flex items-center justify-between h-16 px-4 xm:px-8 overflow-hidden">
      <div className="">
        <h2 className="font-bold text-3xl text-center rounded-md text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-violet-600 w-fit leading-[4rem] overflow-hidden">
          <FontAwesomeIcon
            icon={faStaffSnake}
            className="text-4xl text-pink-700"
          />
          tudent&apos;media
        </h2>
      </div>

      <div className="right-navbar fixed lg:static top-0 right-0 hidden lg:flex gap-8 bg-gradient-to-r lg:[background:none] from-gray-700 to-gray-600  dark:from-slate-800 dark:to-slate-950 min-h-[100vh] lg:min-h-fit z-10 items-center min-w-[170px] dark:font-normal font-medium">
        <div
          className="text-4xl py-2 hover:text-red-800 text-center cursor-pointer"
          onClick={handleRight}
        >
          <FontAwesomeIcon icon={faXmark} size="sm" className="hidden cutX" />
        </div>

        <div className="w-full lg:w-fit flex items-center justify-center">
          <Link
            href="/"
            className="w-full text-2xl overflow-hidden flex items-center justify-center py-4 lg:py-3 lg:px-4 lg:rounded-lg hover:bg-slate-950/30 hover:text-white dark:hover:bg-gray-400/30 hover:lgshadow-[0_0_3px_gray]"
          >
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </div>

        <div className="w-full lg:w-fit flex items-center justify-center">
          <Link
            href="/students"
            className="w-full text-2xl overflow-hidden flex items-center justify-center py-4 lg:py-3 lg:px-4 lg:rounded-lg hover:bg-slate-950/30 hover:text-white dark:hover:bg-gray-400/30 hover:lgshadow-[0_0_3px_gray]"
          >
            <FontAwesomeIcon icon={faUserGroup} />
          </Link>
        </div>

        <div className="w-full lg:w-fit flex items-center justify-center">
          <Link
            href="/chat"
            className="w-full text-2xl overflow-hidden flex items-center justify-center py-4 lg:py-3 lg:px-4 lg:rounded-lg hover:bg-slate-950/30 hover:text-white dark:hover:bg-gray-400/30 hover:lgshadow-[0_0_3px_gray]"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Link>
        </div>

        <div className="w-full lg:w-fit flex items-center justify-center">
          <Link
            href="/login"
            className="w-full text-2xl overflow-hidden flex items-center justify-center py-4 lg:py-3 lg:px-4 lg:rounded-lg hover:bg-slate-950/30 hover:text-white dark:hover:bg-gray-400/30 hover:lgshadow-[0_0_3px_gray]"
          >
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>

        {/* {!USER.user && (
          <div className="w-full lg:w-fit flex items-center justify-center"><Link href="/login" className="w-full text-2xl overflow-hidden flex items-center justify-center py-4 lg:py-3 lg:px-4 lg:rounded-lg hover:bg-slate-950/30 hover:text-white dark:hover:bg-gray-400/30 hover:lgshadow-[0_0_3px_gray]">
            <FontAwesomeIcon icon={faUser} />
          </Link></div>
        )}
        {USER.user && (
          <>
            <div className="w-full lg:w-fit flex items-center justify-center"><Link href={`/login`} className="w-full text-2xl overflow-hidden flex items-center justify-center py-4 lg:py-3 lg:px-4 lg:rounded-lg hover:bg-slate-950/30 hover:text-white dark:hover:bg-gray-400/30 hover:lgshadow-[0_0_3px_gray]">
              {USER.user.name}
            </Link></div>
          </>
        )} */}

        <ToggleMode />
      </div>

      <div className="lg:hidden text-3xl py-2">
        <FontAwesomeIcon
          icon={faBars}
          size="sm"
          className="hamberger cursor-pointer text-gray-700 dark:text-gray-200"
          onClick={handleRight}
        />
      </div>
    </div>
  );
}
