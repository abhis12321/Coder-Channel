import React from 'react';
import Link from 'next/link';

export default function page() {
  return (
    <div className='projects-cant'>
      <h1 className='center'>My projects</h1>
      <div className="project">
        <h2 className="project-tag">News-Hunt</h2>
        <p><span>Tools & technologies used:</span> ReactJs , CSS , Routes</p>
        <div className="desc">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <Link href={`/news/india`}>Take a Look...</Link>
      </div>
      <div className="project">
        <h2 className="project-tag">Tic-Tac-Toe</h2>
        <p><span>Tools & technologies used:</span> ReactJs , CSS , Routes</p>
        <div className="desc">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <Link href={`/tic`}>Take a Look...</Link>
      </div>
      <div className="project">
        <h2 className="project-tag">News-Hunt</h2>
        <p><span>Tools & technologies used:</span> ReactJs , CSS , Routes</p>
        <div className="desc">A React based News Application for current/Daily news (data from news api)I created a news website for current(daily) news using the data of a NEWS API and I created some sections of interests</div>
        <Link href={`/`}>Take a Look...</Link>
      </div>
    </div>
  )
}