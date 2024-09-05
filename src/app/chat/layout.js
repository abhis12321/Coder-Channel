'use client'

import { useAuth } from "../_components/AuthProvider";
import LoginForm from '../_components/LoginForm';

export default function Layout({ children }) {
  const USER = useAuth();

  return (
    <div className='h-nav w-full flex items-center justify-center'>
      {USER.user ?
        <>{children}</>
        :
        <LoginForm />
      }
    </div>
  )
}
