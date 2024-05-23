'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from "../_components/AuthProvider";

export default function Layout({children}) {
  const USER = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if(!USER.user) {
        router.push('/login');
    }
  } , []);

  return (
    <div className=''>
      {children}
    </div>
  )
}
