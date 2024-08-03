import React, { useState } from 'react'
import { useAuth } from '../_components/AuthProvider';
import ForgotPassword from './ForgotPassword';
import ResendVerificationLink from './ResendVerificationLink';
import UserRegistration from './UserRegistration'

export default function LoginForm() {
  const [option, setOption] = useState(0);
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  let USER = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    USER.login({ email, password });
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <h2 className="font-extrabold text-4xl text-center rounded-md text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-violet-600 w-fit pb-2 leading-12 drop-shadow-[0_0_1px_black]">Login Page</h2>
      <form onSubmit={handleLogin} className='from-blue-50 to-blue-50 bg-gradient-to-b  dark:from-blue-900/50 dark:via-cyan-950/90 dark:to-blue-950/60 shadow-[0_0_10px_black] dark:shadow-[0_0_4px_white] w-[98%] max-w-[500px] py-4 px-5 rounded-2xl min-h-[280px] text-white flex flex-col items-center justify-evenly' autoComplete='on'>

        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-blue-950/10 dark:bg-red-600/15 px-2 py-[10px] rounded text-center w-[96%] max-w-[550px] outline-none focus:bg-green-600/15 ring-1 focus:ring-2 ring-violet-700 dark:ring-gray-400' placeholder='email' name='email' required />

        <input type="password" value={password} onChange={(e) => setPass(e.target.value)} className='bg-blue-950/10 dark:bg-red-600/15 px-2 py-[10px] rounded text-center w-[96%] max-w-[550px] outline-none focus:bg-green-600/15 ring-1 focus:ring-2 ring-violet-700 dark:ring-gray-400' placeholder='password' name='password' required />

        <div className="flex items-center justify-evenly w-[98%] max-w-[550px] text-xs xs:text-sm" >
          <div onClick={e => setOption(2)} className="text-blue-700 font-semibold underline hover:text-blue-600 hover:scale-110 cursor-pointer">Resend Verification Link</div>
          <div onClick={e => setOption(1)} className="text-blue-700 font-semibold underline hover:text-blue-600 hover:scale-110 cursor-pointer">forgot password</div>
        </div>

        <div className="w-[96%] max-w-[550px] flex justify-between">
          <div onClick={e => setOption(3)} className='w-[120px] xs:w-[150px] text-center rounded-md bg-red-900/95 py-2 hover:bg-red-700 font-mono' >Register New</div>
          <button type='submit' className='w-[120px] xs:w-[150px] text-center rounded-md bg-red-900/95 py-2 hover:bg-red-700 font-mono' >Login</button>
        </div>
      </form>

      {option == 1 && <ForgotPassword setOption={setOption} />}
      {option == 2 && <ResendVerificationLink setOption={setOption} />}
      {option == 3 && <UserRegistration setOption={setOption} /> }

    </div>
  )
}
