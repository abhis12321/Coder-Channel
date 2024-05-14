"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function Page({params}) {
    const [student , setStudent] = useState();

    useEffect(() => {
        axios.get(`/api/users/${params._id}`)
            .then(res => res.data)
            .then(result => setStudent(result))
            .catch(error => alert(error.message));
    }, []);
  return (
    <div className='flex gap-4 items-center justify-center'>
        <div className="w-fit ">
            <Image src='/img/profileImg.jpg' alt='profile-image' width={200} height={200} className='rounded-full' />
        </div>
      <div className="flex flex-col gap-4 p-8 items-left justify-center bg-gray-700 w-[98%] max-w-[700px] rounded-lg">
        <button className="" onClick={e => console.log(student)}>click</button>
        <h1 className="">{student?.name}</h1>
        <h1 className="">{student?.email}</h1>
        <h1 className="">{student?.course}</h1>
        <h1 className="">{student?.university}</h1>
        <div className="flex gap-4">
            <h1 className="">{student?.likes}</h1>
            <h1 className="">{student?.followers}</h1>
            <h1 className="">{student?.followings}</h1>
        </div>
      </div>
    </div>
  )
}
