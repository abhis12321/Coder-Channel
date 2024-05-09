"use client"
import React from 'react';
import {useAuth} from '../_components/AuthProvider';
import ProfileCard from '../_components/ProfileCard';
import LoginForm from '../_components/LoginForm';

export default function Page() {  
  let USER = useAuth();
  let student = USER.user;

  return (
    <div className="flex flex-col gap-5 items-center justify-center bg-no-repeat bg-center bg-contain " style={{ height:'calc(100vh - 4rem)', }}>
      
      {!USER.user ?
        <LoginForm />
        :
        <ProfileCard student={student}/>
      }
    </div>
  )
}
