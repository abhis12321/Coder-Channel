import Image from 'next/image';
// import me from '../../public/Ab5.jpg';
// import me2 from '../../public/Ab3.jpg';
import React from "react";

export default function AnimationReact({width}) {
  return (
      <div className=" md:w-[40%]">
        <div className="group cursor-pointer w-fit">
          <div className="w-20 h-20 md:w-64 md:h-64 rounded-full bg-transparent cursor-pointer [perspective:1000px] relative [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] duration-[1200ms]">
              <Image
                width={200}
                height={200}
                src={'/Ab5.jpg'}
                alt="@me"
                className="absolute w-full h-full rounded-full object-fit object-center shadow-[0_0_12px_red] opacity-70"
              />
            <div className="absolute bg-slate-950 w-full h-full rounded-full [backface-visibility:hidden] md:[transform:rotateY(180deg)] shadow-xl flex flex-col items-center justify-center gap-4">
              <Image
                width={200}
                height={200}
                src={"/Ab3.jpg"}
                alt="@me"
                className="absolute w-full h-full rounded-full object-fit object-center opacity-50"
              />
                {/* <h1 className="text-lg font-bold text-purple-200 font-mono">Full Stack Web Developer</h1>
                <h1 className="text-2xl text-white font-medium">Jack Hanma</h1> */}
            </div>
          </div>
        </div>
      </div>
  );
};