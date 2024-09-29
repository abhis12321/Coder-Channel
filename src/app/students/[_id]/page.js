"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../_components/AuthProvider';
import Followers from '../../_components/Followers';
import Followings from '../../_components/Followings';
import Blogs from '../../_components/BlogCard';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

export default function Page({ params }) {
  const USER = useAuth();
  const [student, setStudent] = useState();
  const [connections, setConnections] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {   //user's personal data
    axios.get(`/api/single-user/${params._id}`)
      .then(res => res.data)
      .then(result => setStudent(result))
      .catch(error => alert(error.message));

    axios.get(`/api/users/follow/${params._id}`)
      .then(result => result.data)
      .then(data => data.success && setFollowers(data.followers));


    axios.post(`/api/users/follow/${params._id}`)
      .then(result => result.data)
      .then(data => data.success && setFollowings(data.followings));


    axios.post(`/api/blogs/${params?._id}`)
      .then(result => result.data)
      .then(data => data.success && setBlogs(data.blogs));
  }, [params._id]);

  useEffect(() => {
    USER?.user?._id && student?._id &&
      axios.put(`/api/users/follow`, { followedById: USER?.user?._id, followedToId: student?._id })
        .then(response => response.data)
        .then(data => data.success && setStudent({ ...student, isFollowed: data.isFollowed }))
        .catch(error => console.log(error.message));
  }, [USER?.user?._id, student?._id]);

  const handleFollowers = () => {
    if (!USER?.user) {
      alert("login first to follow a user!")
    } else {
      axios.post('/api/users/follow', {
        followedById: USER?.user?._id,
        followedByName: USER?.user?.name,
        followedToId: student?._id,
        followedToName: student?.name,
      })
        .then(result => result.data)
        .then(data => data.success && setFollowers([...followers, data.follow]) && setStudent({ ...student, isFollowed: true }))
        .catch(error => console.log(error.message))
    }
  }


  useEffect(() => {
    console.log(blogs);
  }, [blogs]);


  return (
    <div className={`h-nav flex flex-col gap-4 items-center justify-center py-4 w-full relative`}>
      {!student ?
        <div className={`flex items-center justify-center h-nav`}>
          <div className="mx-auto h-40 w-40 rounded-full animate-spin border-t-4 border-slate-900 dark:border-white flex items-center justify-center"><div className="h-24 w-24 rounded-full border-r-4 border-slate-700 dark:border-white"></div></div>
        </div>
        :
        <>
          <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-around bg-slate-200 dark:bg-blue-900/55 px-[2px] pt-2 pb-1 xs:p-2 sm:p-4 rounded-lg w-[98%] max-w-[900px] text-red-950 dark:text-white shadow-[0_0_2px_black]`}>
            <div className="w-fit flex items-center justify-center">
              <Image src='/img/profileImg.jpg' alt='profile-image' width={200} height={200} className='rounded-full h-36 w-36 sm:h-40 sm:w-40 bg-white shadow-[0_0_2px_black] aspect-square' />
            </div>

            <div className="flex flex-col gap-3 px-1 py-2 xs:p-3 md:p-4 items-center sm:items-start justify-center bg-white dark:bg-blue-200/10 w-[100%] sm:w-[72%] sm:max-w-[700px] rounded-lg">
              <div className="flex gap-2 md:gap-4 flex-wrap items-center">
                <h1 className="text-2xl sm:text-3xl font-bold font-serif drop-shadow-[0_0_5px_lack]">{student?.name}</h1>
                <button className="py-[3px] sm:py-1 px-3 md:px-4 text-xs sm:text-sm rounded-md bg-blue-800/90 hover:bg-blue-600 active:bg-violet-600 w-fit font-serif font-semibold text-gray-200" onClick={handleFollowers}> {student.isFollowed ? "following" : "follow"} </button>
                <Link href={`/chat/${student._id}`} name="personal-message">
                  <FontAwesomeIcon size='sm' icon={faMessage} className='h-[22px] hover:scale-110 text-cyan-700 hover:text-yellow-400 hover:drop-shadow-[0_0_2px_black]' />
                </Link>
                {/* <h1 className="font-mono opacity-80">({student?.email})</h1> */}
              </div>

              <div className="flex flex-wrap gap-1 xs:gap-2 sm:gap-4 items-center justify-center sm:justify-start font-bold sm:font-semibold text-xs sm:text-sm text-white">
                <div className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[5px] sm:py-[3px] bg-green-700 hover:bg-green-600 rounded-md active:bg-violet-600/30">
                  <button className="">{student?.likes}</button>
                  <button className="">Likes</button>
                </div>
                <div className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[5px] sm:py-[3px] bg-green-700 hover:bg-green-600 rounded-md active:bg-violet-600/30" onClick={e => setConnections(1)}>
                  <button className="">{followers.length}</button>
                  <button className="">Followers</button>
                </div>
                <div className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[5px] sm:py-[3px] bg-green-700 hover:bg-green-600 rounded-md active:bg-violet-600/30" onClick={e => setConnections(2)}>
                  <button className="">{followings.length}</button>
                  <button className="" >Followings</button>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <div className="flex gap-[5px] items-start">
                  <h1 className="text-gray-400 w-fit">course : </h1>
                  <h1 className="font-mono flex-1 font-semibold">{student?.course}</h1>
                </div>
                <div className="flex gap-[5px] items-start">
                  <h1 className="text-gray-400 w-fit">university : </h1>
                  <h1 className="font-mono flex-1 font-semibold">{student?.university}</h1>
                </div>
              </div>
            </div>
          </div>

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
      }


      {
        connections === 1 && <Followers _id={params?._id} setConnections={setConnections} followers={followers} />
      }
      {
        connections === 2 && <Followings _id={params?._id} setConnections={setConnections} followings={followings} />
      }

    </div>
  )
}
