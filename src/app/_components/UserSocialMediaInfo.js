import Link from 'next/link'
import { IoSchoolSharp } from "react-icons/io5";
import { FaBuilding, FaGithubAlt, FaLinkedin, FaInstagram } from 'react-icons/fa6'

export default function UserSocialMediaInfo({ course, university, github, linkedIn, instagram }) {
    return (
        <div className="flex flex-col items-center sm:items-start gap-1 md:gap-[3px]">
            {course && <div className="flex items-start justify-center break-all overflow-x-clip text-center md:text-start leading-3 gap-x-[1px]">
                <IoSchoolSharp className='text-gray-500 text-[1.1rem] pr-[3px] w-fit relative top-[-2px] drop-shadow-[0_0_2px_white] leading-3' />
                <span className="font-mono flex-1 font-semibold leading-3">{course}</span>
            </div>}
            {university && <div className="flex items-start justify-center break-all overflow-x-clip text-center md:text-start leading-3 gap-x-[5px] pb-[4px]">
                <FaBuilding className='text-gray-500 text-[.81rem] px-[2px] scale-x-[1.37] w-fit relative top-[0px] drop-shadow-[0_0_2px_white] leading-3' />
                <span className="font-mono flex-1 font-semibold leading-3">{university}</span>
            </div>}
            {linkedIn && <Link href={linkedIn || ""} className="flex items-start justify-center break-all overflow-x-clip text-center md:text-start leading-3 gap-x-[5.4px] hover:text-blue-600 hover:scale-105 duration-300 pb-[2px]">
                <FaLinkedin className='text-blue-700 text-[1rem] w-fit relative top-[-2.3px] drop-shadow-[0_0_2px_white] leading-3' />
                <span className="font-mono flex-1 font-semibold leading-3">{linkedIn}</span>
            </Link>}
            {instagram && <Link href={instagram || ""} className="flex items-start justify-center break-all overflow-x-clip text-center md:text-start leading-3 gap-x-[5px] hover:text-blue-600 hover:scale-105 duration-300">
                <FaInstagram className='text-pink-700 text-[1.02rem] w-fit relative top-[-1.7px] drop-shadow-[0_0_2px_white] leading-3' />
                <span className="font-mono flex-1 font-semibold leading-3">{instagram}</span>
            </Link>}
            {github && <Link href={github || ""} className="flex items-start justify-center break-all overflow-x-clip text-center md:text-start leading-3 gap-x-[3.5px] hover:text-blue-600 hover:scale-105 duration-300">
                <FaGithubAlt className='text-gray-950 text-[1.1rem] w-fit relative top-[-2.5px] drop-shadow-[0_0_2px_white] leading-3' />
                <span className="font-mono flex-1 font-semibold leading-3">{github}</span>
            </Link>}
        </div>
    )
}
