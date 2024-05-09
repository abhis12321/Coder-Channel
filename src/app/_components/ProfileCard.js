import Link from 'next/link'
import React from 'react'

export default function ProfileCard({student}) {
  return (
    <div className="bg-gradient-to-tr from-gray-900/30 via-violet-950/30 to-gray-950/30 dark:from-slate-900 dark:via-cyan-950 dark:to-slate-950 shadow-[0_0_3px_black] hover:shadow-[0_0_7px_black] dark:shadow-[0_0_4px_white] dark:hover:shadow-[0_0_10px_white] text-white rounded-3xl w-[95%] md:w-[80%] max-w-[800px] flex flex-col justify-center gap-3  min-h-[40vh] px-3 sm:px-14 py-9 *:drop-shadow-[0_0_3px_black]">
      
          <p className= "font-bold text-justify">
            <span className="text-lime-100 dark:text-gray-500 font-bold dark:font-semibold">Email : </span>
            {student.email}
          </p>
          <h2 className="font-bold text-justify">
            <span className="text-lime-100 dark:text-gray-500 font-bold dark:font-semibold">Name : </span>
            {student.name}
          </h2>
          <h2 className="font-bold text-justify">
            <span className="text-lime-100 dark:text-gray-500 font-bold dark:font-semibold">University : </span>
            {student.university}
          </h2>
          <h2 className="font-bold text-justify">
            <span className="text-lime-100 dark:text-gray-500 font-bold dark:font-semibold">Course : </span>
            {student.course}
          </h2>
          <h2 className="font-bold text-justify">
            <span className="text-lime-100 dark:text-gray-500 font-bold dark:font-semibold">Branch : </span>
            {student.branch}
          </h2>
          <h2 className="font-bold text-justify">
            <span className="text-lime-100 dark:text-gray-500 font-bold dark:font-semibold">Semester : </span>
            {student.semester}
          </h2>
          <Link href={`/login/logout`} className="m-1 opacity-80 dark:opacity-100 bg-red-700 hover:bg-violet-950 inline-block w-[74px] font-semibold py-1 rounded text-center shadow-[0_0_8px_black]"> Logout</Link>
        </div>
  )
}
