import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faSquareEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <div className="flex flex-col [background-color:black] dark:border-t-2 border-gray-800 opacity-85 text-gray-50">
      <div className='px-3 xs:px-8 flex flex-col md:flex-row items-center justify-around flex-1'>
        <div className="md:w-[40%] w-full flex flex-col items-center">
          <div className="pt-4">
            <h2 className="max-h-12 font-serif font-extrabold text-[1.8rem] text-center rounded-md text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-violet-100 w-fit overflow-hidden">Coder&apos;media</h2>
            <p className="text-center text-yellow-400 font-semibold drop-shadow-[0_0_7px_white] pt-[6px]">creator&apos;s info</p>
          </div>
          
          <div className="py-4 flex justify-around items-center rounded-lg self-center sm:self-auto w-[250px]">
            <Link
              target="_blank"
              href={`https://github.com/abhis12321`}
              className="hover:scale-110 duration-500"
            >
              <FontAwesomeIcon
                icon={faGithub}
                size="2x"
                className="p-[4px] text-[1.8rem] rounded-md bg-slate-950 dark:bg-blue-950 text-white ring-[1px] ring-gray-500"
              />
            </Link>
            <Link
              target="_blank"
              href={`https://www.linkedin.com/in/abhishek-singh-b82427256/`}
              className="hover:scale-110 duration-500"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                size="3x"
                className="text-blue-700 hover:text-blue-600 text-[2.6rem]"
              />
            </Link>
            <Link
              target="_blank"
              href={`https://www.instagram.com/____abhis____/`}
              className="hover:scale-110 duration-500"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                size="3x"
                className="text-rose-800/95 hover:text-rose-700 text-[2.76rem]"
              />
            </Link>
            <Link
              target="_blank"
              href={`mailto:abhisheksingh2359328@gmail.com`}
              className="hover:scale-110 duration-500"
            >
              <FontAwesomeIcon
                icon={faSquareEnvelope}
                size="3x"
                className="text-blue-800 text-[2.65rem]"
              />
            </Link>
          </div>

        </div>
        <div className="flex flex-row justify-around md:gap-4 items-center w-[290px] md:w-[60%]">
          <div className="flex flex-col md:gap-2 justify-between items-center md:items-start">
            <Link href={'/'} className='py-1 px-3 rounded-md text-gray-100 hover:text-gray-400 text-center'>home</Link>
            <Link href={'/login'} className='py-1 px-3 rounded-md text-gray-100 hover:text-gray-400 text-center'>profile</Link>
            <Link href={'/students'} className='py-1 px-3 rounded-md text-gray-100 hover:text-gray-400 text-center'>students</Link>
          </div>
          <div className="flex flex-col md:gap-2 justify-between items-center md:items-start">
            <Link href={'/about'} className='py-1 px-3 rounded-md text-gray-100 hover:text-gray-400 text-center'>about</Link>
            <Link href={'/contact'} className='py-1 px-3 rounded-md text-gray-100 hover:text-gray-400 text-center'>contact</Link>
            <Link href={'/chat'} className='py-1 px-3 rounded-md text-gray-100 hover:text-gray-400 text-center'>public chat</Link>
          </div>
        </div>
      </div>

      <div className="text-orange-300 text-xs text-center pt-3 pb-2 font-bold overflow-hidden"><span className="font-extrabold">&copy;</span>Coder&apos;media! A public social-media platform.</div>
    </div>
  )
}
