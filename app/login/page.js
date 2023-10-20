"use client"
import Link from 'next/link';
import React from 'react';
import {currUrl} from '/mongo/exp2';
import {useAuth} from '/mongo/AuthProvider'

export default function Page() {
  const [password , setPass] = React.useState("");
  const [email , setEmail] = React.useState("");
  let USER = useAuth();
  const handleLogin = async(e) => {
    e.preventDefault();
    let info = await fetch(`${currUrl}/api/login` , {
                method:"post",
                body:JSON.stringify({email , password})
              })
              .then(res => res.json())
              .catch(err => {return {success:false}});

    if(info.success) {
      USER.login(info.User);
      alert(info.message)
    }
    else {
      alert(info.message)
    }

    // console.log(USER.user);
  }

  return (
    <>
    {!USER.user ?
      <form onSubmit={handleLogin} className='form-cant' autoComplete='on'>
        <input type="email" value = {email} onChange={(e)=> setEmail(e.target.value)} className='form-input' placeholder='email' name='email' id='email'required/>
        <input type="password" value = {password} onChange={(e)=> setPass(e.target.value)} className='form-input' placeholder='password' name='password' id='password' required/>
        <div className="resister">
          <button type='submit' className='form-input hover' >Login</button>
          <Link href={`/login/resistration`} className='form-input hover' >New Resistration</Link>
        </div>
      </form>
      :
      <Link href={`/`}>Aready Logged In : go back</Link>
      }
    </>
  )
}
