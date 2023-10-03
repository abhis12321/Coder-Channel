import React from 'react';

export default function Layout({children}) {
  return (
    <>
    {/* layout will render even when it's new folders or children are rendering */}
    <p>layout for courses</p> 
     {children}
    </>
  )
}