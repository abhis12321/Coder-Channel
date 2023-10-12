import React from 'react';
import  Link  from 'next/link';

function NavBar() {
  return (
    <>
      <ul className='nav'>
        <Link href="/" className='nav-tag'>Home</Link>
        <Link href="/news" className='nav-tag'> News</Link>
        <Link href="/my_classmates" className='nav-tag'> Classmates</Link>
        <Link href="/students" className='nav-tag'> Students</Link>
        <Link href="/form1" className='nav-tag'> form1</Link>
        <Link href="/tic" className='nav-tag'> Tic Tac Toe</Link>
      </ul>
    </>
  )
}

export default NavBar
