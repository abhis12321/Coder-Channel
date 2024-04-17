import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faHeart,  faShareNodes , faMicroscope} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import A from './/profile.jpg'


export default function Card({ getData, student }) {
  return (
    <div className=' bg-slate-900 py-4 px-4 h-[444px] w-[325px] shadow-[0_0_10px_white] hover:shadow-[0_0_15px_red] rounded-lg text-white flex flex-col justify-evenly items-center gap-3'>
      <div className="">
        <Image src={A} alt='profile-img' className="h-[140px] m-auto rounded-full overflow-hidden border-4 border-green-700 opacity-80" width={140} height={140}/>
      </div>
      <div className="text-2xl font-bold">
        {student.name}
      </div>
      <div className="text-center text-slate-400">
      {student.university}
      </div>
      <div className="flex justify-center items-center gap-8">
        <Link href={`/student`}><FontAwesomeIcon icon={faInstagram} size='2x' className='hover:scale-110 text-rose-800'/></Link>
        <Link href={`/student`}><FontAwesomeIcon icon={faLinkedin} size='2x' className='hover:scale-110 text-blue-700 '/></Link>
        <Link href={`/student`}><FontAwesomeIcon icon={faGithub} size='2x' className='hover:scale-110 text-gray-400'/></Link>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button className='w-[100px] text-center py-[10px] rounded-lg bg-green-700 hover:bg-green-600 font-semibold font-mn text-gray-200'>follow</button>
        <Link href={`chat/${student._id}`} className='w-[100px] text-center py-[10px] rounded-lg bg-green-700 hover:bg-green-600 font-semibold font-mn text-gray-200'>Message</Link>
      </div>
      <div className="flex items-center justify-center">        
        <FontAwesomeIcon icon={faHeart} size='1x' className=' text-rose-700 hover:drop-shadow-[0_0_3px_yellow] opacity-100 py-[2px] px-[50%] h-6 cursor-pointer  '/>
        <FontAwesomeIcon icon={faMicroscope} size='1x' className='border-x-2 border-gray-600 text-blue-700 hover:drop-shadow-[0_0_3px_yellow] opacity-100 py-[2px] px-[50%] h-6 cursor-pointer  '/>
        <FontAwesomeIcon icon={faShareNodes} size='1x' className='text-gray-400 hover:drop-shadow-[0_0_3px_yellow] opacity-100 py-[2px] px-[50%] h-6 cursor-pointer  '/>
      </div>
    </div>
  )
}
