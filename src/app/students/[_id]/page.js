"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../_components/AuthProvider';

export default function Page({ params }) {
  const USER = useAuth();
  const [student, setStudent] = useState();

  useEffect(() => {
    axios.get(`/api/users/${params._id}`)
      .then(res => res.data)
      .then(result => setStudent(result))
      .catch(error => alert(error.message));
  }, []);

  const handleFollowers = () => {
    if (!USER?.user) {
      alert("login first to follow a user!")
    } else {
      alert(`you have successfully followed to ${student.name}!!`)
      axios.post('/api/users/follow', {
        followedById: USER?.user?._id,
        followedByName: USER?.user?.name,
        followedToId: student?._id,
        followedToName: student?.name,
      })
        .then(result => console.log(result));
    }
  }

  return (
    <div className='flex items-center justify-center py-4'>
      {!student ?
        <div className='flex items-center justify-center' style={{ minHeight: 'calc(100vh - 4rem)' }}>
          <div className="mx-auto h-40 w-40 rounded-full animate-spin border-t-4 border-slate-900 dark:border-white flex items-center justify-center"><div className="h-24 w-24 rounded-full border-r-4 border-slate-700 dark:border-white"></div></div>
        </div>
        :

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-around bg-blue-700/15 sm:bg-blue-900/30 p-2 md:p-4 rounded-lg w-[98%] max-w-[1000px] text-white">
          <div className="w-fit flex items-center justify-center">
            <Image src='/img/profileImg.jpg' alt='profile-image' width={200} height={200} className='rounded-full h-36 w-36 sm:h-40 sm:w-40' />
          </div>

          <div className="flex flex-col gap-2 p-3 md:p-4 items-left justify-center dark:bg-slate-700/40 bg-blue-950/30 w-[100%] sm:w-[72%] sm:max-w-[700px] rounded-lg">
            <div className="flex gap-2 md:gap-4 flex-wrap items-center">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif">{student?.name}</h1>
              <button className="py-1 px-3 md:px-4 text-sm sm:text-base rounded-md bg-blue-600/50 hover:bg-blue-600 active:bg-violet-600 w-fit font-serif font-semibold text-gray-200" onClick={handleFollowers}>click</button>
              {/* <h1 className="font-mono opacity-80">({student?.email})</h1> */}
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-start font-bold sm:font-semibold text-xs sm:text-base">
              <div className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[3px] sm:py-[2px] bg-green-700/60 rounded-md hover:bg-green-600 active:bg-violet-600/30">
                <button className="text-gray-50 dark:text-gray-200 text-sm sm:text-lg">{student?.likes}</button>
                <button className="">Likes</button>
              </div>
              <div className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[3px] sm:py-[2px] bg-green-700/60 rounded-md hover:bg-green-600 active:bg-violet-600/30" >
                <button className="text-gray-50 dark:text-gray-200 text-sm sm:text-lg">{student?.followers}</button>
                <button className="">Followers</button>
              </div>
              <div className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[3px] sm:py-[2px] bg-green-700/60 rounded-md hover:bg-green-600 active:bg-violet-600/30" >
                <button className="text-gray-50 dark:text-gray-200 text-sm sm:text-lg">{student?.followings}</button>
                <button className="">Following</button>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-1 items-start">
                <h1 className="opacity-60 w-fit">course : </h1>
                <h1 className="font-mono text-lg flex-1">{student?.course}</h1>
              </div>
              <div className="flex gap-1 items-start">
                <h1 className="opacity-60 w-fit">university : </h1>
                <h1 className="font-mono text-lg flex-1">{student?.university}</h1>
              </div>
            </div>
          </div>

        </div>
      }
    </div>
  )
}
