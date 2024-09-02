import Link from 'next/link'
import React from 'react'

export default function Not_found() {
  return (
    <div className='w-full min-h-[100vh] flex flex-col gap-6 items-center justify-center font-semibold'>
      <h1 className="text-center mx-auto bg-inherit text-6xl">4O4:Page Not Found</h1>
      <Link href={'/'} className="text-center mx-auto px-5 py-[6px] rounded-md ring-1 ring-gray-900 hover:bg-gray-900 hover:text-white dark:ring-white dark:hover:bg-white dark:hover:text-gray-900 duration-700">Go to Home Page</Link>
    </div>
  )
}
