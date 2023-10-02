import React from 'react';
import  Link  from 'next/link';

function NavBar() {
  return (
    <>
      <nav>
        <Link href="/" className='nav-tag'>Home</Link>
        <Link href="/about" className='nav-tag'>About</Link>
        <Link href="/contact" className='nav-tag'>Contact</Link>
        <Link href="/courses" className='nav-tag'>Courses</Link>
        <Link href="/navigate" className='nav-tag'>Navigate</Link>
        <Link href="/user" className='nav-tag'>Users</Link>
      </nav>
    </>
  )
}

export default NavBar
