"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "/mongo/AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { usePathname } from "next/navigation";

export default function NavBar() {
  let USER = useAuth();
  // let path = usePathname();

  const [active , setActive] = React.useState('hom');

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data != null) {
      USER.login(data);
    }
  } , [])

  const handleRight = () => {
    let right = document.querySelector('.nav-right');
    // let bar = document.querySelector('#bar');
    if(right.style.right === '0px') {
      right.style.right = "-500px";
      // bar.style.paddingRight = '15px';
    }
    else {
      right.style.right = '0px'; 
      // bar.style.paddingRight = '75px';     
    }
  }

  const addActive = (cls) => {
    // let tag = document.getElementsByClassName(cls);
    // let prev = document.getElementsByClassName(active);
    // prev[0].removeAttribute('id');
    // tag[0].setAttribute('id', 'active');
    // setActive(cls)
  }


  return (
    <div className="nav-cant">
      <div className="nav-left">
        <h2 className="nav-tag1">@bhishek singh</h2>
      </div>
      <div className="nav-right">
        <div >
          <FontAwesomeIcon icon={faXmark} size='sm' id="x" className="nav-tag" onClick={handleRight}/> 
        </div>
        <div><Link href="/" className="nav-tag hom" onClick={e => addActive('hom')}>
          Home
        </Link></div>
        <div><Link href="/projects" className="nav-tag hom" onClick={e => addActive('hom')}>
          Projects
        </Link></div>
        <div><Link href="/chat" className="nav-tag hom" onClick={e => addActive('hom')}>
          Chat
        </Link></div>
        {/* <div><Link href="/news/india" className="nav-tag nws" onClick={e => addActive('nws')}>
          News-Hunt
        </Link></div> */}
        <div><Link href="/students" className="nav-tag stu" onClick={e => addActive('stu')}>
          Students
        </Link></div>
        {/* <div><Link href="/tic" className="nav-tag game" onClick={e => addActive('game')}>
          Game
        </Link></div> */}
        {!USER.user && (
          <div><Link href="/login" className="nav-tag log" onClick={e => addActive('log')}>
            Login
          </Link></div>
        )}
        {USER.user && (
          <>
            <div><Link href={`/login`} className="nav-tag left lg"  onClick={e => addActive('lg')}>
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
