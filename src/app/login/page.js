"use client"
import React, { useEffect, useState } from 'react';
import {useAuth} from '../_components/AuthProvider';
import ProfileCard from '../_components/ProfileCard';
import LoginForm from '../_components/LoginForm';
import UserLogout from '../_components/UserLogout';

export default function Page() {  
  let USER = useAuth();
  const [status , setStatus] = useState(true);
  // useEffect(() => {
  //   console.log(USER);
  // } , [USER]);


  return (
    <div className="flex flex-col gap-5 py-5 items-center justify-center bg-no-repeat bg-center bg-contain " style={{ minHeight:'calc(100vh - 4rem)', }}>
      {status ?
        (!USER.user ?
          <LoginForm />
          :
          <ProfileCard student={USER?.user} setStatus = {e => setStatus(false)}/>
        )
        :
        <UserLogout USER={USER} setStatus={setStatus}/>
      }
    </div>
  )
}
