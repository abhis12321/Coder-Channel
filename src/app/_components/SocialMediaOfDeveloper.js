import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faSquareEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

export default function SocialMediaOfDeveloper() {
  return (
    <div className="py-3 flex justify-between md:justify-evenly items-center w-[98vw] max-w-[220px] md:max-w-[300px]">
    <Link
        target="_blank"
        href={`https://github.com/abhis12321`}
        className="hover:scale-110 duration-500"
      >
        <FontAwesomeIcon
          icon={faGithub}
          size="2x"
          className="h-[1.8rem] p-[4px] text-[1.8rem] rounded-md bg-slate-950 dark:bg-blue-950 text-white ring-[1px] ring-gray-500"
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
          className="h-[2.6rem] text-blue-700 hover:text-blue-600 text-[2.6rem]"
        />
      </Link>
      <Link
        target="_blank"
        href={`https://www.instagram.com/_______abhishek_singh_______/`}
        className="hover:scale-110 duration-500"
      >
        <FontAwesomeIcon
          icon={faInstagram}
          size="3x"
          className="h-[2.76rem] text-rose-800/95 hover:text-rose-700 text-[2.76rem]"
        />
      </Link>    
    </div>
  )
}
