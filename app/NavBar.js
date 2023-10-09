import React from 'react';
import  Link  from 'next/link';

function NavBar() {
  return (
    <>
      <nav className='nav'>
        <Link href="/" className='nav-tag'>Home</Link>
        <Link href="/about" className='nav-tag'>About</Link>
        <Link href="/contact" className='nav-tag'>Contact</Link>
        <Link href="/courses" className='nav-tag'>Courses</Link>
        <Link href="/navigate" className='nav-tag'>Navigate</Link>
        <Link href="/user" className='nav-tag'>Users</Link>
        <Link href="/news" className='nav-tag'> News</Link>
        <Link href="/my_classmates" className='nav-tag'> My Classmates</Link>
        <Link href="/students" className='nav-tag'> Students</Link>
        <Link href="/form1" className='nav-tag'> form1</Link>
        <Link href="/form2" className='nav-tag'> form2</Link>
      </nav>
    </>
  )
}

export default NavBar
