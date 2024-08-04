'use client'

import React, { useState } from 'react'
import { useAuth } from "../_components/AuthProvider";
import Link from 'next/link';
import LoginForm from '../_components/LoginForm';

export default function Layout({ children }) {
  const USER = useAuth();
  const [option, setOption] = useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setOption(1);
    }, 1000);
  }, []);


  return (
    <div className='h-nav w-full flex items-center justify-center'>
      {USER.user ?
        <>{children}</>
        :
        option == 0 ?
          <div className="h-40 w-40 rounded-full animate-spin border-t-4 border-slate-900 dark:border-white flex items-center justify-center">
            <div className="h-24 w-24 rounded-full border-r-4 border-slate-700 dark:border-white">
            </div>
          </div>
          :
          <LoginForm />
      }

    </div>
  )
}
