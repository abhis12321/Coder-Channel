"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import fav from "./favicon.ico";
import { useAuth } from "/mongo/AuthProvider";

function NavBar() {
  let USER = useAuth();

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    // console.log(data);
    if (data != null) {
      USER.login(data);
    }
  } , [])

  return (
    <>
      <div className="nav">
        <Image src={fav} alt="jack" height="25" className="nav-tag" />
        <Link href="/" className="nav-tag">
          Home
        </Link>
        <Link href="/news/india" className="nav-tag">
          News
        </Link>
        <Link href="/students" className="nav-tag">
          Students
        </Link>
        <Link href="/tic" className="nav-tag">
          Game
        </Link>
        {!USER.user && (
          <Link href="/login" className="nav-tag">
            {" "}
            Login
          </Link>
        )}
        {USER.user && (
          <>
            <Link href={`/profile`} className="nav-tag left">
              {USER.user.name}
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default NavBar;
