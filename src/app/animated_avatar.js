import Image from 'next/image';
import me from '../../public/Ab5.jpg';
import me2 from '../../public/Ab6.jpg';
import React from "react";

export default function AnimationReact({width}) {
  return (
        <div className="hiddn md:block group cursor-pointer md:w-[40%]">
          <div className=" w-20 h-20 md:w-64 md:h-64 rounded-full bg-transparent cursor-pointer [perspective:1000px] relative [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] duration-[1200ms] border-4 border-green-800">
              <Image
                src={me}
                alt="@me"
                className="absolute w-full h-full rounded-full object-fit object-center "
              />
            <div className="absolute w-full h-full rounded-full [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-xl bg-indigo-950 flex flex-col items-center justify-center gap-4">
              <Image
                src={me2}
                alt="@me"
                className="absolute w-full h-full rounded-full object-fit object-center "
              />
                {/* <h1 className="text-lg font-bold text-purple-200 font-mono">Full Stack Web Developer</h1>
                <h1 className="text-2xl text-white font-medium">Jack Hanma</h1> */}
            </div>
          </div>
        </div>
  );
};