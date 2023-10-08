// 'use client'
import Script from 'next/script'
import React from 'react'

export default function Python() {
  const {mongo_username , mongo_password} = process.env;
  console.log(mongo_username , mongo_password);
  const mongoconnect = "mongodb+srv://abhis12321:<password>@mongo1.fbw8him.mongodb.net/?retryWrites=true&w=majority";
  // const[location , setLocation] = React.useState("null");
  // const handleScriptLoad = () => {
  //   let loc = getLocation();
  //   // console.log(loc + "jack");
  //   setLocation(loc);
  // }

  return (
    <>
    {/* <Script src='/location.js' 
    onLoad={handleScriptLoad}
    /> */}
     <h1>It is a About page</h1> 
     <h2>your lacation is </h2>
    </>
  )
}