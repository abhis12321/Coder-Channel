import Link from 'next/link';
import SocialMediaOfDeveloper from './SocialMediaOfDeveloper';

export default function Footer() {
  return (
    <div className="flex flex-col bg-black opacity-85 text-gray-50">
      <div className='px-3 xs:px-8 flex flex-col md:flex-row items-center justify-around flex-1'>
        <div className="md:w-[40%] w-full flex flex-col items-center">
          <div className="pt-4">
            <h2 className="max-h-12 font-serif italic font-extrabold text-[1.8rem] text-center rounded-md text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-violet-100 w-fit overflow-hidden">#CoderMedia</h2>
            <p className="text-center text-yellow-400 font-semibold drop-shadow-[0_0_7px_white] pt-[6px]">creator&apos;s info</p>
          </div>
          <SocialMediaOfDeveloper />

        </div>
        <div className="flex flex-col md:flex-row justify-around md:gap-4 items-center w-[290px] md:w-[60%] text-blue-200/90">
          <div className="flex flex-row md:flex-col md:gap-2 justify-between items-center md:items-start">
            <Link href={'/'} className='py-1 px-3 rounded-md text-center'>home</Link>
            <Link href={'/login'} className='py-1 px-3 rounded-md text-center'>profile</Link>
            <Link href={'/students'} className='py-1 px-3 rounded-md text-center'>students</Link>
          </div>
          <div className="flex flex-row md:flex-col md:gap-2 justify-between items-center md:items-start">
            <Link href={'/about'} className='py-1 px-3 rounded-md text-center'>about</Link>
            <Link href={'/contact'} className='py-1 px-3 rounded-md text-center'>contact</Link>
            <Link href={'/chat'} className='py-1 px-3 rounded-md text-center'>public chat</Link>
          </div>
        </div>
      </div>

      <div className="text-gr text-blue-50 text-center py-4 overflow-hidden drop-shadow-[0_0_1px_black]">© 2024 CoderMedia. All rights reserved.</div>
    </div>
  )
}
