import React from 'react'

function page({params }) {
    // console.log(params);
  return (
    <div>
      <h1>user id is {params.id}</h1>
    </div>
  )
}

export default page