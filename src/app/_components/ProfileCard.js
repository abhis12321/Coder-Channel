"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Followers from './Followers';
import Followings from './Followings';
// import { useAuth } from './AuthProvider';
import Blogs from './BlogCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default function ProfileCard({ student, setStatus }) {
  const [connections, setConnections] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    axios.get(`/api/users/follow/${student?._id}`)
      .then(result => result.data)
      .then(data => data.success && setFollowers(data.followers));


    axios.post(`/api/users/follow/${student?._id}`)
      .then(result => result.data)
      .then(data => data.success && setFollowings(data.followings));


    axios.get(`/api/blogs/${student?._id}`)
      .then(result => result.data)
      .then(data => data.success && setBlogs(data.blogs));
  }, [student?._id]);

  const handleUnFollow = () => {
    // if (!student) {
    //   alert("login first to follow a user!")
    // } else {
    //   axios.post('/api/users/follow', {
    //     followedById: student?._id,
    //     followedByName: student?.name,
    //     followedToId: student?._id,
    //     followedToName: student?.name,
    //   })
    //     .then(result => result.data)
    //     .then(data => alert(data.message));
    // }
  }

  const handleRemoveFollower = () => {
    // if (!student) {
    //   alert("login first to follow a user!")
    // } else {
    //   axios.post('/api/users/follow', {
    //     followedById: student?._id,
    //     followedByName: student?.name,
    //     followedToId: student?._id,
    //     followedToName: student?.name,
    //   })
    //     .then(result => result.data)
    //     .then(data => alert(data.message));
    // }
  }

  return (
    <div className={`flex flex-col gap-4 items-center justify-center py-4 w-full relative`}>
      {!student ?
        <div className={`flex items-center justify-center h-nav`}>
          <div className="mx-auto h-40 w-40 rounded-full animate-spin border-t-4 border-slate-900 dark:border-white flex items-center justify-center"><div className="h-24 w-24 rounded-full border-r-4 border-slate-700 dark:border-white"></div></div>
        </div>
        :

        <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-around bg-blue-700/15 sm:bg-blue-900/30 px-[2px] pt-2 pb-1 xs:p-2 sm:p-4 rounded-lg w-[98%] max-w-[900px] text-white`}>
          <div className="w-fit flex items-center justify-center">
            <Image src='/img/profileImg.jpg' alt='profile-image' width={200} height={200} className='rounded-full h-36 w-36 sm:h-40 sm:w-40 shadow-[0_0_3px_gray]' />
          </div>

          <div className="flex flex-col gap-3 px-1 py-2 xs:p-3 md:p-4 items-center sm:items-start justify-center dark:bg-slate-700/40 bg-blue-950/30 w-[100%] sm:w-[72%] sm:max-w-[700px] rounded-lg">
            <div className="flex gap-2 md:gap-4 flex-wrap items-center">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif">{student?.name}</h1>
              <button className="py-[3px] sm:py-1 px-3 md:px-4 text-xs sm:text-sm rounded-md bg-red-600/50 hover:bg-red-600 active:bg-violet-600 w-fit font-serif font-semibold text-gray-200" onClick={e => setStatus(true)}>logout</button>
              <FontAwesomeIcon size='sm' icon={faGear} className='text-2xl cursor-pointer text-gray-400 hover:text-blue-200' />
            </div>

            <div className="flex flex-wrap gap-1 xs:gap-2 sm:gap-4 items-center justify-center sm:justify-start font-bold sm:font-semibold text-xs sm:text-sm">
              <div className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[5px] sm:py-[3px] bg-green-700/60 rounded-md hover:bg-green-600 active:bg-violet-600/30">
                <button className="text-gray-50 dark:text-gray-200">{student?.likes}</button>
                <button className="">Likes</button>
              </div>
              <div className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[5px] sm:py-[3px] bg-green-700/60 rounded-md hover:bg-green-600 active:bg-violet-600/30" onClick={e => setConnections(1)}>
                <button className="text-gray-50 dark:text-gray-200">{followers.length}</button>
                <button className="">Followers</button>
              </div>
              <div className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[5px] sm:py-[3px] bg-green-700/60 rounded-md hover:bg-green-600 active:bg-violet-600/30" onClick={e => setConnections(2)}>
                <button className="text-gray-50 dark:text-gray-200">{followings.length}</button>
                <button className="" >Following</button>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <div className="flex gap-[5px] items-start">
                <h1 className="opacity-60 w-fit">course : </h1>
                <h1 className="font-mono flex-1">{student?.course}</h1>
              </div>
              <div className="flex gap-[5px] items-start">
                <h1 className="opacity-60 w-fit">university : </h1>
                <h1 className="font-mono flex-1">{student?.university}</h1>
              </div>
            </div>
          </div>

        </div>
      }

      {
        connections === 1 && <Followers _id={student?._id} setConnections={setConnections} followers={followers} handleRemoveFollower={handleRemoveFollower}/>
      }
      {
        connections === 2 && <Followings _id={student?._id} setConnections={setConnections} followings={followings} handleUnFollow={handleUnFollow}/>
      }


      <>
        <h2 className="font-semibold text-4xl font-mono opacity-70">Blogs</h2>
        {blogs?.length > 0 ?
          <div className="w-full flex flex-col gap-3 items-center justify-evenly">
            {
              blogs.map((blog, index) => <Blogs key={index} blog={blog} />)
            }
          </div>
          :
          <div className="opacity-50">No Blogs till Now</div>
        }
      </>
    </div>
  )
}
