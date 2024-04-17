"use client";
import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { useAuth } from "/mongo/AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { usePathname } from "next/navigation";

export default function NavBar() {
  let USER = useAuth();

  const [active , setActive] = React.useState('hom');

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data != null) {
      USER.login(data);
    }
  } , [])

  const handleRight = () => {
    document.querySelector('.right-navbar').classList.toggle('hidden');
    document.querySelector('.cutX').classList.toggle('hidden');
    document.querySelector('.hamberger').classList.toggle('hidden');
  }

  // const handleRight = () => {
  //   let right = document.querySelector('.nav-right');
  //   // let bar = document.querySelector('#bar');
  //   if(right.style.right === '0px') {
  //     right.style.right = "-500px";
  //     // bar.style.paddingRight = '15px';
  //   }
  //   else {
  //     right.style.right = '0px'; 
  //     // bar.style.paddingRight = '75px';     
  //   }
  // }

  const addActive = (cls) => {
    // let tag = document.getElementsByClassName(cls);
    // let prev = document.getElementsByClassName(active);
    // prev[0].removeAttribute('id');
    // tag[0].setAttribute('id', 'active');
    // setActive(cls)
  }


  return (
    <div className="bg-gradient-to-b from-slate-950 to-slate-800  text-white flex items-center justify-between h-4rem leading-[4rem] px-8">
      <div className="">
        <h2 className="font-bold text-3xl text-center rounded-md text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 w-fit leading-[4rem]"><span>@</span>bhishek singh</h2>
      </div>

      <div className="fixed top-0 right-0 lg:static lg:flex gap-1 hidden right-navbar bg-gradient-to-b from-slate-950 to-slate-800  lg:bg-inherit min-h-[100vh] lg:min-h-fit z-10">
        <div className="text-3xl py-2 hover:bg-slate-950 hover:text-red-800 text-center cursor-pointer"  onClick={handleRight}>
          <FontAwesomeIcon icon={faXmark} size='sm' className="hidden cutX"/> 
        </div>
        <div className="lg:bg-gradient-to-b lg:from-slate-950 lg:to-slate-800 hover:bg-slate-950 text-center"><Link href="/" className="py-3 px-12 lg:px-8 rounded-lg font-semibold hover:bg-slate-950" onClick={e => addActive('hom')}>
          Home
        </Link></div>
        <div className="lg:bg-gradient-to-b lg:from-slate-950 lg:to-slate-800 hover:bg-slate-950 text-center"><Link href="/projects" className="py-3 px-12 lg:px-8 rounded-lg font-semibold hover:bg-slate-950" onClick={e => addActive('hom')}>
          Projects
        </Link></div>
        <div className="lg:bg-gradient-to-b lg:from-slate-950 lg:to-slate-800 hover:bg-slate-950 text-center"><Link href="/chat" className="py-3 px-12 lg:px-8 rounded-lg font-semibold hover:bg-slate-950" onClick={e => addActive('hom')}>
          Chat
        </Link></div>
        <div className="lg:bg-gradient-to-b lg:from-slate-950 lg:to-slate-800 hover:bg-slate-950 text-center"><Link href="/students" className="py-3 px-12 lg:px-8 rounded-lg font-semibold hover:bg-slate-950" onClick={e => addActive('stu')}>
          Students
        </Link></div>
        {!USER.user && (
          <div className="lg:bg-gradient-to-b lg:from-slate-950 lg:to-slate-800 hover:bg-slate-950 text-center"><Link href="/login" className="py-3 px-12 lg:px-8 rounded-lg font-semibold hover:bg-slate-950" onClick={e => addActive('log')}>
            Login
          </Link></div>
        )}
        {USER.user && (
          <>
            <div className="lg:bg-gradient-to-b lg:from-slate-950 lg:to-slate-800 hover:bg-slate-950 text-center"><Link href={`/login`} className="py-3 px-12 lg:px-8 rounded-lg font-semibold hover:bg-slate-950"  onClick={e => addActive('lg')}>
              {USER.user.name}
            </Link></div>
          </>
        )}
      </div>
      <div className="lg:hidden text-3xl py-2">
        <FontAwesomeIcon icon={faBars} size='sm' className="hamberger cursor-pointer" onClick={handleRight}/> 
      </div>
    </div>

    // <div className="nav-cant">
    //   <div className="nav-left">
    //     <h2 className="nav-tag-logo-name"><span>@</span>bhishek singh</h2>
    //   </div>
    //   <div className="nav-right">
    //     <div >
    //       <FontAwesomeIcon icon={faXmark} size='sm' id="x" className="nav-tag" onClick={handleRight}/> 
    //     </div>
    //     <div><Link href="/" className="nav-tag hom" onClick={e => addActive('hom')}>
    //       Home
    //     </Link></div>
    //     <div><Link href="/projects" className="nav-tag hom" onClick={e => addActive('hom')}>
    //       Projects
    //     </Link></div>
    //     <div><Link href="/chat" className="nav-tag hom" onClick={e => addActive('hom')}>
    //       Chat
    //     </Link></div>
    //     {/* <div><Link href="/news/india" className="nav-tag nws" onClick={e => addActive('nws')}>
    //       News-Hunt
    //     </Link></div> */}
    //     <div><Link href="/students" className="nav-tag stu" onClick={e => addActive('stu')}>
    //       Students
    //     </Link></div>
    //     {/* <div><Link href="/tic" className="nav-tag game" onClick={e => addActive('game')}>
    //       Game
    //     </Link></div> */}
    //     {!USER.user && (
    //       <div><Link href="/login" className="nav-tag log" onClick={e => addActive('log')}>
    //         Login
    //       </Link></div>
    //     )}
    //     {USER.user && (
    //       <>
    //         <div><Link href={`/login`} className="nav-tag left lg"  onClick={e => addActive('lg')}>
    //           {USER.user.name}
    //         </Link></div>
    //       </>
    //     )}
    //   </div>
    //   <div className="anti-right">
    //     <FontAwesomeIcon icon={faBars} size='sm' id="bar" className="nav-tag" onClick={handleRight}/> 
    //   </div>
    // </div>
  );
}
