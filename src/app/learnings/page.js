import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faC, faN } from '@fortawesome/free-solid-svg-icons'
import { faBootstrap, faCss3Alt, faGithub, faHtml5, faInstagram, faJava, faLinkedin, faReact, faSquareJs } from '@fortawesome/free-brands-svg-icons';

import Link from 'next/link';

export default function page() {
  return (

    <div className=''>
      <div className="flex flex-col items-end pr-8 justify-center bg-gray-900 h-[90.9vh] text-white bg-[url('/Ab2.png')] bg-no-repeat bg-center">
        <h3 className='intro-tag'>My name is </h3>
        <h1 className='intro-tag'>Abhishek Singh</h1>
        <h3 className='intro-tag'>& I am a Passionate </h3>
        <h1 className='intro-tag'>Web Developer ,</h1>
        <h1 className='intro-tag'>Problem Solver &</h1>
        <h1 className='intro-tag'>Full Stack Developer</h1>
        <div className='social-media'>
          <Link target='_blank' href={`https://github.com/abhis12321`} className='social-platform'><FontAwesomeIcon icon={faGithub} size='3x' id='gitub' className=' text-gray-500' /></Link>
          <Link target='_blank' href={`https://www.linkedin.com/in/abhishek-singh-b82427256/`} className='social-platform'><FontAwesomeIcon icon={faLinkedin} size='3x' /></Link>
          <Link target='_blank' href={`https://www.instagram.com/____abhis____/`}><FontAwesomeIcon icon={faInstagram} size='3x' className='social-platform' id='insta' /></Link>
        </div>
      </div>

      <section className="gap-6 bg-gray-950  text-white py-4 flex items-center justify-center flex-col ">
        <h1 className='mx-auto text-center py-4 px-8 my-2 text-4xl rounded-md border-2 border-white font-extrabold  text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 w-fit'>My Learnings</h1>
      
        <div className="min-h-[40vh] flex w-[95%] md:w-[80%] lg:max-w-[65%] rounded-lg px-4 shadow-[0_0_10px_white] hover:shadow-[0_0_15px_red] bg-gray-900 ">
          <div className="technology-tag w-[30%]">
            <FontAwesomeIcon icon={faC} size='8x' id='c1' className='bg-blue-950 px-5 py-3 rounded-lg' />
          </div>
          <div className="technology-tag w-[70%]">
            <h2 className='bg-gray-950 font-bold px-4 py-2 rounded'>Dec 2021</h2>
            <p className='font-mono text-[14px] text-gray-400 py-3' >My first and the starting programming language is C as It was also in the course of my BTECH 1st year and 2nd year hence I learned the BASICS of C language and Data Structure in C language</p>
          </div>
        </div>

        <div className="min-h-[40vh] flex w-[95%] md:w-[80%] lg:max-w-[65%] rounded-lg px-4 shadow-[0_0_10px_white] hover:shadow-[0_0_15px_red] bg-gray-900 ">
          <div className="technology-tag w-[30%]">
            <FontAwesomeIcon icon={faJava} size='8x' id='jaa' className='bg-orange-800  px-4 py-2 rounded-lg' />
            <h3 className='font-bold ' >Java</h3>
          </div>
          <div className="technology-tag w-[70%]">
            <h2 className='bg-gray-950 font-bold px-4 py-2 rounded'>August 2022</h2>
            <p className='font-mono text-[14px] text-gray-400 py-3' >Java is my main programming language as I have spend a long time to study the BASICS of JAVA , Data Structure and Algorithm in JAVA language ans Object Oriented Programming in JAVA language</p>
          </div>
        </div>

        <div className="min-h-[40vh] flex w-[95%] md:w-[80%] lg:max-w-[65%] rounded-lg px-4 shadow-[0_0_10px_white] hover:shadow-[0_0_15px_red] bg-gray-900 ">
          <div className="technology-tag w-[30%]">
            <FontAwesomeIcon icon={faHtml5} size='8x' id='htl' className='text-orange-700  px-4 py-2 rounded-lg' />
            <h3 className='font-bold ' >HTML</h3>
          </div>
          <div className="technology-tag w-[70%]">
            <h2 className='bg-gray-950 font-bold px-4 py-2 rounded'>December 2022</h2>
            <p className='font-mono text-[14px] text-gray-400 py-3' >It was the initial Starting for my web development journey as a beginner I started with HTML(Hyper Text Markup Language)</p>
          </div>
        </div>

        <div className="min-h-[40vh] flex w-[95%] md:w-[80%] lg:max-w-[65%] rounded-lg px-4 shadow-[0_0_10px_white] hover:shadow-[0_0_15px_red] bg-gray-900 ">
          <div className="technology-tag  w-[30%]">
            <FontAwesomeIcon icon={faCss3Alt} size='8x' id='cs' className='text-blue-800' />
            <h3 className='font-bold ' >CSS</h3>
          </div>
          <div className="technology-tag  w-[70%]">
            <h2 className='bg-gray-950 font-bold px-4 py-2 rounded'>December 2022</h2>
            <p className='font-mono text-[14px] text-gray-400 py-3' >It was the initial Starting for my web development journey as a beginner I started with HTML and here I also focused on CSS(Cascading Style Sheet) as It gives a good look to the HTML</p>
          </div>
        </div>

        <div className="min-h-[40vh] flex w-[95%] md:w-[80%] lg:max-w-[65%] rounded-lg px-4 shadow-[0_0_10px_white] hover:shadow-[0_0_15px_red] bg-gray-900 ">
          <div className="technology-tag  w-[30%]">
            <FontAwesomeIcon icon={faSquareJs} size='8x' id='j' className='text-yellow-700' />
            <h3 className='font-bold ' >JavaScript</h3>
          </div>
          <div className="technology-tag  w-[70%]">
            <h2 className='bg-gray-950 font-bold px-4 py-2 rounded'>February 2023</h2>
            <p className='font-mono text-[14px] text-gray-400 py-3' >After having a good knowledge of HTML and CSS, I moved to JavaScript as It is used in Front-end and Back-end of and web-app and provides some Dynamic properties too</p>
          </div>
        </div>

        <div className="min-h-[40vh] flex w-[95%] md:w-[80%] lg:max-w-[65%] rounded-lg px-4 shadow-[0_0_10px_white] hover:shadow-[0_0_15px_red] bg-gray-900 ">
          <div className="technology-tag  w-[30%]">
            <FontAwesomeIcon icon={faBootstrap} size='8x' id='oot' className='text-violet-700' />
            <h3 className='font-bold ' >Bootstrap</h3>
          </div>
          <div className="technology-tag  w-[70%]">
            <h2 className='bg-gray-950 font-bold px-4 py-2 rounded'>February 2023</h2>
            <p className='font-mono text-[14px] text-gray-400 py-3' >Bootstrap is an toolkit which makes the web development very fast and dynamic, It is an predefined CSS and JavaScript containing tool, I spend some time to learn How to use Bootstrap in my projects</p>
          </div>
        </div>

        <div className="min-h-[40vh] flex w-[95%] md:w-[80%] lg:max-w-[65%] rounded-lg px-4 shadow-[0_0_10px_white] hover:shadow-[0_0_15px_red] bg-gray-900 ">
          <div className="technology-tag  w-[30%]">
            <FontAwesomeIcon icon={faReact} size='7x' id='ract' className='bg-blue-900 rounded-lg p-2' />
            <h3 className='font-bold ' >ReactJS</h3>
          </div>
          <div className="technology-tag  w-[70%]">
            <h2 className='bg-gray-950 font-bold px-4 py-2 rounded'>May 2023</h2>
            <p className='font-mono text-[14px] text-gray-400 py-3' >React is an JavaScript library for front-end only and I spend a lot of time in learning ReactJS and its properties like : hooks, routing , etc</p>
          </div>
        </div>

        <div className="min-h-[40vh] flex w-[95%] md:w-[80%] lg:max-w-[65%] rounded-lg px-4 shadow-[0_0_10px_white] hover:shadow-[0_0_15px_red] bg-gray-900 ">
          <div className="technology-tag  w-[30%]">
            <FontAwesomeIcon icon={faN} size='5x' id='N1' className='bg-black px-9 py-6 rounded-full' />
            <h3 className='font-bold ' >NextJS</h3>
          </div>
          <div className="technology-tag  w-[70%]">
            <h2 className='bg-gray-950 font-bold px-4 py-2 rounded'>September 2023</h2>
            <p className='font-mono text-[14px] text-gray-400 py-3' >NextJs is an a complete package for web development, It is a ReactJS framework but as we know ReactJS is only an front-end libreary but NextJS is a not only for Front-end, It can be used for Back-end develoment too.</p>
          </div>
        </div>

      </section>
    </div>
  )
}