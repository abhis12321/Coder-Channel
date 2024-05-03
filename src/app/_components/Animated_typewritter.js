"use client"
import React from "react"; 
import Typewriter from 'typewriter-effect/dist/core';


export default function TypingEffect() {
  React.useEffect(() => {
    let newwriter = new Typewriter('#typewriter', {
        strings: ['Front-End Developer', 'Back-End Developer' , 'Full Stack Web Developer', 'MERN-Stack Developer' , 'Problem-Solver'],
        autoStart: true,
        loop:true,
      });
      
} , []);

  return (
    <div id="typewriter" className="drop-shadow-[0_0_7px_red] text-4xl md:text-5xl font-bold text-center md:text-left self-center md:self-auto mx-auto md:mx-0">
    </div>
  );
}
