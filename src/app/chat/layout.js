'use client'

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
    <div className='bg-slate-950 text-white min-h-[90.9vh]'  style={{height:'calc(100vh-4rem)',}}>
      {children}
    </div>
  )
}
