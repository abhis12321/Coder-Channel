import React from 'react';

function layout({children}) {
  return (
    <>
    {/* layout will render even when it's new folders or children are rendering */}
    <p>layout for courses</p> 
     {children}
    </>
  )
}

export default layout
