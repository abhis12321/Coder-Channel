"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "/mongo/AuthProvider";
import Im  from "/mongo/Abhis2.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  let USER = useAuth();

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    // console.log(data);
    if (data != null) {
      USER.login(data);
    }
  } , [])

  const handleRight = () => {
    let right = document.querySelector('.nav-right');
    right.style.display = right.style.display === 'flex' ? "none" : 'flex';
    
  }
  return (
    <div className="nav-cant">
      <div className="nav-left">
        <h2 className="nav-tag1">@bhishek singh</h2>
      </div>
      <div className="nav-right">
        <div><Link href="/" className="nav-tag">
          Home
        </Link></div>
        <div><Link href="/news/india" className="nav-tag">
          News
        </Link></div>
        <div><Link href="/students" className="nav-tag">
          Students
        </Link></div>
        <div><Link href="/tic" className="nav-tag">
          Game
        </Link></div>
        {!USER.user && (
          <div><Link href="/login" className="nav-tag">
            {" "}
            Login
          </Link></div>
        )}
        {USER.user && (
          <>
            <div><Link href={`/login`} className="nav-tag left">
              {USER.user.name}
            </Link></div>
          </>
        )}
      </div>
      <div className="anti-right">
        <FontAwesomeIcon icon={faBars} size='sm' id="bar" className="nav-tag" onClick={handleRight}/> 
      </div>
    </div>
  );
}

export default NavBar;
