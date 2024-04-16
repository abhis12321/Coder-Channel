"use client"
import Link from 'next/link';
import React from 'react';
import {useAuth} from '/mongo/AuthProvider';

export default function Page() {
  const [password , setPass] = React.useState("");
  const [email , setEmail] = React.useState("");
  
  let USER = useAuth();
  let student = USER.user;

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
              .catch(err => {return {success:false}});
    
  }

  return (
    <div className="flex flex-col gap-5 items-center justify-center bg-slate-950 bg-no-repeat bg-center bg-contain " style={{ height:'calc(100vh - 4rem)', }}>
      
      {!USER.user ?
      <>
        <h1 className='mx-auto text-center py-4 px-8 my-2 text-4xl rounded-md border-2 border-white font-extrabold  text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 w-fit'>Login Page</h1>
        <form onSubmit={handleLogin} className='bg-gradient-to-b from-slate-700 to-slate-950  shadow-[0_0_10px_white] w-[98%] sm:w-[95%] md:w-[60%] py-8 rounded-xl min-h-[280px] text-white opacity-90' autoComplete='on'>
          <h1 className=" mb-5 text-center text-2xl font-semibold drop-shadow-[0_0_5px_black]">Login with your email-id</h1>
          
          <input type="email" value = {email} onChange={(e)=> setEmail(e.target.value)} className='block m-4 p-2 rounded mx-auto text-center w-[90%] max-w-[500px] bg-inherit shadow-[0_0_8px_white]' placeholder='email' name='email' required/>
          <input type="password" value = {password} onChange={(e)=> setPass(e.target.value)} className='block m-4 p-2 rounded mx-auto text-center w-[90%] max-w-[500px] bg-inherit shadow-[0_0_8px_white]' placeholder='password' name='password' required/>
          <div className="flex items-center justify-evenly" >
            <Link href={`/login/resend`} className="drop-shadow-[0_0_5px_red]">Resend Verification Link</Link>
            <Link href={`/login/forgot`} className="drop-shadow-[0_0_5px_red]">forgot password</Link>
          </div>
          <div className="w-[90%] max-w-[500px] m-auto flex justify-between pt-2">
            <button type='submit' className='w-[120px] xm:w-[150px] text-center rounded-md bg-red-900 py-2 hover:bg-red-700 font-mono' >Login</button>
            <Link href={`/login/resistration`} className='w-[120px] xm:w-[150px] text-center rounded-md bg-red-900 py-2 hover:bg-red-700 font-mono' >Resister New</Link>
          </div>
        </form>
      </>
      
        :
        
        <div className="bg-gradient-to-b from-gray-800 to-slate-900 shadow-[0_0_7px_white] hover:shadow-[0_0_15px_white] text-white rounded-3xl w-[95%] md:w-[80%] max-w-[800px] flex flex-col justify-center gap-3  min-h-[40vh] px-3 sm:px-14 py-9">
      
          <p className= "font-bold text-justify">
            <span className="text-gray-500 font-semibold">Email : </span>
            {student.email}
          </p>
          <h2 className="font-bold text-justify">
            <span className="text-gray-500 font-semibold">Name : </span>
            {student.name}
          </h2>
          <h2 className="font-bold text-justify">
            <span className="text-gray-500 font-semibold">University : </span>
            {student.university}
          </h2>
          <h2 className="font-bold text-justify">
            <span className="text-gray-500 font-semibold">Course : </span>
            {student.course}
          </h2>
          <h2 className="font-bold text-justify">
            <span className="text-gray-500 font-semibold">Branch : </span>
            {student.branch}
          </h2>
          <h2 className="font-bold text-justify">
            <span className="text-gray-500 font-semibold">Semester : </span>
            {student.semester}
          </h2>
          <Link href={`/login/logout`} className="m-1 bg-red-700 hover:bg-violet-700 inline-block w-[74px] font-semibold py-1 rounded text-center shadow-[0_0_8px_black]"> Logout</Link>
        </div>
      }
    </div>
  )
}
