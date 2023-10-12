import React from 'react'

function layout({children}) {
  return (
    <div className='form-cant'>
      <h1 className='form-tag'>Enter Details of the Student</h1>
      {children}
    </div>
  )
}

export default layout
