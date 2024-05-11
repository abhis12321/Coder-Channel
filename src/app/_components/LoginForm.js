import Link from 'next/link'
import React from 'react'
import {useAuth} from '../_components/AuthProvider';

export default function LoginForm() {
    const [password , setPass] = React.useState("");
    const [email , setEmail] = React.useState("");  
    let USER = useAuth();
    
  const handleLogin = async(e) => {
    e.preventDefault();
    await fetch(`/api/login` , {
                method:"post",
                body:JSON.stringify({email , password})
              })
              .then(res => res.json())
              .then(info => {
                if(info.success) {
                  USER.login(info.User);
                }
                  alert(info.message)                
              })
              .catch(err =>  {success:false});
  }

  return (
    <form onSubmit={handleLogin} className='bg-gradient-to-br from-gray-500 via-lime-950/40 to-gray-500 dark:from-slate-900 dark:via-cyan-950 dark:to-slate-950 shadow-[0_0_10px_white] w-[98%] max-w-[700px] py-4 xs:py-7 rounded-xl min-h-[280px] text-white flex flex-col gap-3 items-center justify-around' autoComplete='on'>
      
      <div className="bg-slate-950/20 py-2 px-10 rounded-lg">
        <h2 className="font-extrabold text-4xl text-center rounded-md text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-violet-600 w-fit pb-2 leading-12">Login Page</h2>
        <p className="hidden sm:flex text-center text-sm font-mono text-yellow-400 font-semibold drop-shadow-[0_0_7px_white]">Login with your email-id</p>
      </div>

      <input type="email" value = {email} onChange={(e)=> setEmail(e.target.value)} className='bg-slate-950/30 p-2 rounded text-center w-[96%] max-w-[550px] shadow-[0_0_4px_white] outline-none focus:bg-slate-950/50 focus:ring-2' placeholder='email' name='email' required/>
      
      <input type="password" value = {password} onChange={(e)=> setPass(e.target.value)} className='bg-slate-950/30 p-2 rounded text-center w-[96%] max-w-[550px] shadow-[0_0_4px_white] outline-none focus:bg-slate-950/50 focus:ring-2' placeholder='password' name='password' required/>

      <div className="flex items-center justify-evenly w-[98%] max-w-[550px] text-sm xs:text-base" >
        <Link href={`/login/resend`} className="drop-shadow-[0_0_5px_red] hover:text-yellow-500">Resend Verification Link</Link>
        <Link href={`/login/forgot`} className="drop-shadow-[0_0_5px_red] hover:text-yellow-500">forgot password</Link>
      </div>

      <div className="w-[96%] max-w-[550px] flex justify-between">
        <Link href={`/login/resistration`} className='w-[120px] xs:w-[150px] text-center rounded-md bg-red-900/95 py-2 hover:bg-red-700 font-mono' >Resister New</Link>
        <button type='submit' className='w-[120px] xs:w-[150px] text-center rounded-md bg-red-900/95 py-2 hover:bg-red-700 font-mono' >Login</button>
      </div>
    </form>
  )
}
