'use client'
import React from 'react'

export default function Page({params }) {
    // console.log(params);
  return (
    <div>
      <h1>user id is {params.id}</h1>
    </div>
  )
}
