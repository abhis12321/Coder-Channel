'use client'
import './style.css'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useAuth , handleMessage} from "/mongo/AuthProvider";

export default function Layout({children}) {
  const USER = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if(!USER.user) {
        router.push('/login');
    }
  } , []);

  return (
    <div className='chat-app-box'>
      {children}
    </div>
  )
}
