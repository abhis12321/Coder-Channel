"use client"
import { useState } from 'react';
import LoginForm from './LoginForm';
import UserLogout from './UserLogout';
import {useAuth} from './AuthProvider';
import ProfileCard from './LoggedInProfileCard';

export default function LoggedInUserProfile() {  
  let { user } = useAuth();
  const [status , setStatus] = useState(true);

  return (
    <div className="flex flex-col gap-5 py-5 items-center justify-center bg-no-repeat bg-center bg-contain h-nav">
      { !user ?
          <LoginForm />
          :
          <ProfileCard setStatus = {e => setStatus(false)}/>
      }

      {
        !status &&  <UserLogout setStatus={setStatus}/>
      }
    </div>
  )
}
