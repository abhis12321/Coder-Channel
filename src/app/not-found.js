import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Not_found() {
  return (
    <div className='flex flex-col gap-6 items-center justify-center h-nav' >
      <h1 className="text-center mx-auto bg-inherit text-6xl font-semibold">4O4:Page Not Found</h1>
      <Link href={'/'} className="text-center mx-auto bg-blue-600/10 px-5 py-[6px] rounded-md ring-1 ring-gray-950 dark:ring-white">Go to Home Page</Link>
    </div>
  )
}
