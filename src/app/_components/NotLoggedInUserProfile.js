"use client"
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react'
import Blogs from './BlogCard';
import Followers from './Followers';
import Followings from './Followings';
import { useAuth } from './AuthProvider';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ErrorPage from './ErrorPage';

export default function NotLoggedInUserProfile({ params }) {
  const { user, socket } = useAuth();
  const [onlineStatus, setOnlineStatus] = useState(params._id == user?._id);
  const [student, setStudent] = useState();
  const [connections, setConnections] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(false);


  useEffect(() => {   //user's personal data
    loadUserData();
    loadFollowings();
    loadFollowers();
    loadBlogs();
  }, [params._id]);


  const handleFollowers = () => {
    if (!user) {
      alert("login first to follow a user!")
    } else {
      axios.post('/api/users/follow', { followedById: user?._id, followedToId: student?._id })
        .then(response => response.data)
        .then(data => {
          if (data.success) {
            loadFollowers();
            setStudent({ ...student, isFollowed: true });
          }
        })
        .catch(error => console.error(error.message))
    }
  }

  const loadBlogs = () => {
    axios.post(`/api/blogs/${params?._id}`)
      .then(result => result.data)
      .then(data => {
        if (data.success) setBlogs(data.blogs)
      });
  }

  const loadFollowers = () => {
    axios.get(`/api/users/follow/${params._id}`)
      .then(result => result.data)
      .then(data => data.success && setFollowers(data.followers));
  }
  const loadFollowings = () => {
    axios.post(`/api/users/follow/${params._id}`)
      .then(result => result.data)
      .then(data => data.success && setFollowings(data.followings));
  }

  const loadUserData = () => {
    axios.get(`/api/single-user/${params._id}`)
      .then(res => res.data)
      .then(data => {
        if(data.success) {
          checkFollowed(data.user)
        } else {
          setError(true);
        }
      })
      .catch(error => alert(error.message));
  }
  const checkFollowed = (userData) => {
    if (user?._id && params?._id) {
      axios.put(`/api/users/follow`, { followedById: user?._id, followedToId: params?._id })
        .then(response => response.data)
        .then(data => {
          if (data.success) {
            setStudent({ ...userData, isFollowed: data.isFollowed })
          } else {
            setStudent(userData);
          }
        })
        .catch(error => console.error(error.message));
    } else {
      setStudent(userData);
    }
  }


  const handleStatus = ({ _id, status }) => {
    if (student?._id == _id) {
      setOnlineStatus(status);
    }
  }

  const handleEnistingOnlineUsers = (onlineUsersId) => {
    const set = new Set(onlineUsersId);
    if (set.has(student?._id)) {
      setOnlineStatus(true);
    }
  }

  useEffect(() => {
    socket?.emit("loadOnlineUsers", user._id);
    socket?.on("online-status", handleStatus);
    socket?.on("existingOnline", handleEnistingOnlineUsers);
    return () => {
      socket?.off("online-status", handleStatus);
      socket?.off("existingOnline", handleEnistingOnlineUsers);
    }
  }, [socket, student]);



  return (
    <div className={`h-nav flex flex-col gap-4 items-center justify-center py-4 w-full relative`}>
      {
        error ?
          <ErrorPage />
          :
          !student ?
            <div className={`flex items-center justify-center h-nav`}>
              <div className="mx-auto h-40 w-40 rounded-full animate-spin border-t-4 border-slate-900 dark:border-white flex items-center justify-center"><div className="h-24 w-24 rounded-full border-r-4 border-slate-700 dark:border-white"></div></div>
            </div>
            :
            <>
              <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-around bg-slate-200 dark:bg-blue-900/55 px-[2px] pt-2 pb-1 xs:p-2 sm:p-4 rounded-lg w-[98%] max-w-[900px] text-red-950 dark:text-white shadow-[0_0_2px_black]`}>
                <div className="w-fit flex items-center justify-center">
                  <Image src='/img/profileImg.jpg' alt='profile-image' width={200} height={200} className={`rounded-full h-36 w-36 sm:h-40 sm:w-40 bg-white shadow-[0_0_2px_black] aspect-square ring-2 ${onlineStatus ? "ring-green-700" : "ring-red-700"}`} />
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
                      <button className="">{blogs?.length}</button>
                      <button className="">Blogs</button>
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
                    blogs.map((blog, index) => <Blogs key={index} blog={blog} loadBlogs={loadBlogs} />)
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