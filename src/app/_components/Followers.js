import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Followers({_id , setConnections}) {
    const [followers, setFollowers] = useState();
    useEffect(() => {
        axios.get(`/api/users/follow/${_id}`)
            .then(result =>  result.data)
            .then(data => data.success && setFollowers(data.followers));
    },[_id]);
  return (
    <div className='flex flex-col items-center justify-around w-[98%] mx-[2%] max-w-[400px] bg-blue-950 p-2 fixed'>
      <div className="flex items-center justify-around w-full">
        <div className="">Followers</div>
        <div className="text-xl text-red-800 font-semibold px-2 py-[2px] cursor-pointer hover:text-red-500 hover:scale-150 duration-500" onClick={e => setConnections(0)}>X</div>
      </div>
      {
        followers?.map((user , index) => 
            <Link href={`/students/${user.followedById}`} className="p-2 font-mono bg-blue-100/10 rounded w-full text-center hover:ring-2 hover:bg-violet-800/10 ring-violet-800" key={index}>{user.followedByName}</Link>
        ) 
      }
    </div>
  )
}
