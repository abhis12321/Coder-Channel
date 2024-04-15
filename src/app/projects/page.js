
import React from 'react';
import Link from 'next/link';


export default function page() {
  return (
    <div className='flex flex-col bg-slate-950 pt-5'>
      <h1 className='mx-auto text-center py-4 px-8 my-2 text-4xl rounded-md border-2 border-white font-extrabold  text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 w-fit'>My Projects</h1>
      
      <div className="bg-slate-900 shadow-[0_0_7px_white] hover:shadow-[0_0_15px_red] text-white w-[95%] md:w-[80%] max-w-[900px] my-[20px] mx-auto p-[10px] sm:p-[20px] min-h-[180px] text-center rounded-lg ">
        <h2 className="my-4 font-bold text-xl drop-shadow-[0_0_7px_violet]">Student&rsquo;s Social Media App</h2>
        <p className='text-[12px] italic text-yellow-400 font-bold' ><span className='font-normal' >Tools & technologies used :</span> ReactJs , Next.js , CSS , MongoDb , Socket.io , Nodemailer</p>
        <div className="font-mono text-[14px] my-3 text-gray-400">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <div className="flex fle-col xm:flex-row gap-2 items-center justify-around">
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://github.com/abhis12321/student-login-app-nextjs`}>Github Repository...</Link>
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`/`}>Take a Look...</Link>
        </div>  
      </div>
      
      
      <div className="bg-slate-900 shadow-[0_0_7px_white] hover:shadow-[0_0_15px_red] text-white w-[95%] md:w-[80%] max-w-[900px] my-[20px] mx-auto p-[10px] sm:p-[20px] min-h-[180px] text-center rounded-lg ">
        <h2 className="my-4 font-bold text-xl drop-shadow-[0_0_7px_violet]">E-commerce Web App</h2>
        <p className='text-[12px] italic text-yellow-400 font-bold' ><span className='font-normal' >Tools & technologies used :</span> HTML , EJS , CSS , Node.js , Expess.js , MongoDB</p>
        <div className="font-mono text-[14px] my-3 text-gray-400">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <div className="flex fle-col xm:flex-row gap-2 items-center justify-around">
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://github.com/abhis12321/ecommerse-backend`}>Github Repository...</Link>
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`/projects`}>Take a Look...</Link>
        </div>  
      </div>

      <div className="bg-slate-900 shadow-[0_0_7px_white] hover:shadow-[0_0_15px_red] text-white w-[95%] md:w-[80%] max-w-[900px] my-[20px] mx-auto p-[10px] sm:p-[20px] min-h-[180px] text-center rounded-lg ">
        <h2 className="my-4 font-bold text-xl drop-shadow-[0_0_7px_violet]">Node.js Chat App</h2>
        <p className='text-[12px] italic text-yellow-400 font-bold' ><span className='font-normal' >Tools & technologies used :</span> HTML , CSS , Node.js , Express.js , MongoDB</p>
        <div className="font-mono text-[14px] my-3 text-gray-400">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <div className="flex fle-col xm:flex-row gap-2 items-center justify-around">
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://github.com/abhis12321/node-chat-app`}>Github Repository...</Link>
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`/projects`}>Take a Look...</Link>
        </div>  
      </div>

      <div className="bg-slate-900 shadow-[0_0_7px_white] hover:shadow-[0_0_15px_red] text-white w-[95%] md:w-[80%] max-w-[900px] my-[20px] mx-auto p-[10px] sm:p-[20px] min-h-[180px] text-center rounded-lg ">
        <h2 className="my-4 font-bold text-xl drop-shadow-[0_0_7px_violet]">Password Generator</h2>
        <p className='text-[12px] italic text-yellow-400 font-bold' ><span className='font-normal' >Tools & technologies used :</span> HTML , CSS , JavaScript</p>
        <div className="font-mono text-[14px] my-3 text-gray-400">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <div className="flex fle-col xm:flex-row gap-2 items-center justify-around">
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://github.com/abhis12321/password-generator`}>Github Repository...</Link>
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://abhis12321.github.io/password-generator/`}>Take a Look...</Link>
        </div>  
      </div>

      <div className="bg-slate-900 shadow-[0_0_7px_white] hover:shadow-[0_0_15px_red] text-white w-[95%] md:w-[80%] max-w-[900px] my-[20px] mx-auto p-[10px] sm:p-[20px] min-h-[180px] text-center rounded-lg ">
        <h2 className="my-4 font-bold text-xl drop-shadow-[0_0_7px_violet]">Simen Says</h2>
        <p className='text-[12px] italic text-yellow-400 font-bold' ><span className='font-normal' >Tools & technologies used :</span> HTML , CSS , JavaScript</p>
        <div className="font-mono text-[14px] my-3 text-gray-400">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <div className="flex fle-col xm:flex-row gap-2 items-center justify-around">
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://github.com/abhis12321/simen_says`}>Github Repository...</Link>
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://abhis12321.github.io/simen_says/`}>Take a Look...</Link>
        </div>  
      </div>

      <div className="bg-slate-900 shadow-[0_0_7px_white] hover:shadow-[0_0_15px_red] text-white w-[95%] md:w-[80%] max-w-[900px] my-[20px] mx-auto p-[10px] sm:p-[20px] min-h-[180px] text-center rounded-lg ">
        <h2 className="my-4 font-bold text-xl drop-shadow-[0_0_7px_violet]">Temperature Convertor</h2>
        <p className='text-[12px] italic text-yellow-400 font-bold' ><span className='font-normal' >Tools & technologies used :</span> HTML , CSS , JavaScript</p>
        <div className="font-mono text-[14px] my-3 text-gray-400">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <div className="flex fle-col xm:flex-row gap-2 items-center justify-around">
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://github.com/abhis12321/Temp_Converter`}>Github Repository...</Link>
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://abhis12321.github.io/Temp_Converter/`}>Take a Look...</Link>
        </div>  
      </div>

      <div className="bg-slate-900 shadow-[0_0_7px_white] hover:shadow-[0_0_15px_red] text-white w-[95%] md:w-[80%] max-w-[900px] my-[20px] mx-auto p-[10px] sm:p-[20px] min-h-[180px] text-center rounded-lg ">
        <h2 className="my-4 font-bold text-xl drop-shadow-[0_0_7px_violet]">Task Manager(ToDo List)</h2>
        <p className='text-[12px] italic text-yellow-400 font-bold' ><span className='font-normal' >Tools & technologies used :</span> ReactJs , CSS , JavaScript</p>
        <div className="font-mono text-[14px] my-3 text-gray-400">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <div className="flex fle-col xm:flex-row gap-2 items-center justify-around">
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://github.com/abhis12321/To-Do-List-or-Task-Manager`}>Github Repository...</Link>
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://abhis12321.github.io/To-Do-List-or-Task-Manager/`}>Take a Look...</Link>
        </div>  
      </div>
      
      <div className="bg-slate-900 shadow-[0_0_7px_white] hover:shadow-[0_0_15px_red] text-white w-[95%] md:w-[80%] max-w-[900px] my-[20px] mx-auto p-[10px] sm:p-[20px] min-h-[180px] text-center rounded-lg ">
        <h2 className="my-4 font-bold text-xl drop-shadow-[0_0_7px_violet]">Audio Player Web App</h2>
        <p className='text-[12px] italic text-yellow-400 font-bold' ><span className='font-normal' >Tools & technologies used :</span> HTML , CSS , EJS , Node.js , Express.js</p>
        <div className="font-mono text-[14px] my-3 text-gray-400">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <div className="flex fle-col xm:flex-row gap-2 items-center justify-around">
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://github.com/abhis12321/singWithMe`}>Github Repository...</Link>
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`/projects`}>Take a Look...</Link>
        </div>  
      </div>

      <div className="bg-slate-900 shadow-[0_0_7px_white] hover:shadow-[0_0_15px_red] text-white w-[95%] md:w-[80%] max-w-[900px] my-[20px] mx-auto p-[10px] sm:p-[20px] min-h-[180px] text-center rounded-lg ">
        <h2 className="my-4 font-bold text-xl drop-shadow-[0_0_7px_violet]">Text-Utilities-App</h2>
        <p className='text-[12px] italic text-yellow-400 font-bold' ><span className='font-normal' >Tools & technologies used :</span> ReactJs , CSS , Routes</p>
        <div className="font-mono text-[14px] my-3 text-gray-400">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <div className="flex fle-col xm:flex-row gap-2 items-center justify-around">
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://github.com/abhis12321/TextUtils---TicTacToe---Weather`}>Github Repository...</Link>
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`/projects`}>Take a Look...</Link>
        </div>  
      </div>

      <div className="bg-slate-900 shadow-[0_0_7px_white] hover:shadow-[0_0_15px_red] text-white w-[95%] md:w-[80%] max-w-[900px] my-[20px] mx-auto p-[10px] sm:p-[20px] min-h-[180px] text-center rounded-lg ">
        <h2 className="my-4 font-bold text-xl drop-shadow-[0_0_7px_violet]">Tic-Tac-Toe</h2>
        <p className='text-[12px] italic text-yellow-400 font-bold' ><span className='font-normal' >Tools & technologies used :</span> ReactJs , CSS , Routes</p>
        <div className="font-mono text-[14px] my-3 text-gray-400">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <div className="flex fle-col xm:flex-row gap-2 items-center justify-around">
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://github.com/abhis12321/TextUtils---TicTacToe---Weather`}>Github Repository...</Link>
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`/projects`}>Take a Look...</Link>
        </div>  
      </div>

      
      <div className="bg-slate-900 shadow-[0_0_7px_white] hover:shadow-[0_0_15px_red] text-white w-[95%] md:w-[80%] max-w-[900px] my-[20px] mx-auto p-[10px] sm:p-[20px] min-h-[180px] text-center rounded-lg ">
        <h2 className="my-4 font-bold text-xl drop-shadow-[0_0_7px_violet]">Real-time LeaderBoard Management</h2>
        <p className='text-[12px] italic text-yellow-400 font-bold' ><span className='font-normal' >Tools & technologies used :</span> ReactJs , CSS , JavaScript</p>
        <div className="font-mono text-[14px] my-3 text-gray-400">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <div className="flex fle-col xm:flex-row gap-2 items-center justify-around">
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://github.com/abhis12321/Real-time-Leaderboard-Management`}>Github Repository...</Link>
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://abhis12321.github.io/Real-time-Leaderboard-Management/`}>Take a Look...</Link>
        </div>  
      </div>


      <div className="bg-slate-900 shadow-[0_0_7px_white] hover:shadow-[0_0_15px_red] text-white w-[95%] md:w-[80%] max-w-[900px] my-[20px] mx-auto p-[10px] sm:p-[20px] min-h-[180px] text-center rounded-lg ">
        <h2 className="my-4 font-bold text-xl drop-shadow-[0_0_7px_violet]">News-Hunt</h2>
        <p className='text-[12px] italic text-yellow-400 font-bold' ><span className='font-normal' >Tools & technologies used :</span> ReactJs , CSS , Routes</p>
        <div className="font-mono text-[14px] my-3 text-gray-400">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <div className="flex fle-col xm:flex-row gap-2 items-center justify-around">
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://github.com/abhis12321/News-Hunt`}>Github Repository...</Link>
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`/projects`}>Take a Look...</Link>
        </div>  
      </div>

      <div className="bg-slate-900 shadow-[0_0_7px_white] hover:shadow-[0_0_15px_red] text-white w-[95%] md:w-[80%] max-w-[900px] my-[20px] mx-auto p-[10px] sm:p-[20px] min-h-[180px] text-center rounded-lg ">
        <h2 className="my-4 font-bold text-xl drop-shadow-[0_0_7px_violet]">Weather-App</h2>
        <p className='text-[12px] italic text-yellow-400 font-bold' ><span className='font-normal' >Tools & technologies used :</span> HTML , CSS , JavaScript</p>
        <div className="font-mono text-[14px] my-3 text-gray-400">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <div className="flex fle-col xm:flex-row gap-2 items-center justify-around">
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://github.com/abhis12321/weather-app`}>Github Repository...</Link>
          <Link className='px-3 text-[14px] sm:text-[1rem] sm:px-4 py-2 rounded bg-slate-950 hover:bg-blue-950 font-bold' target='_blank' href={`https://abhis12321.github.io/weather-app/`}>Take a Look...</Link>
        </div>  
      </div>
      
    </div>
  )
}