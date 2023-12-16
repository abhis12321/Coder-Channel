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
    <div  id="login-cant">
      {!USER.user ?
        <form onSubmit={handleLogin} className='form-cant' autoComplete='on'>
          <h1 className='form-tag'>Login with your email-id</h1>
          
          <input type="email" value = {email} onChange={(e)=> setEmail(e.target.value)} className='form-input' placeholder='email' name='email' id='email'required/>
          <input type="password" value = {password} onChange={(e)=> setPass(e.target.value)} className='form-input' placeholder='password' name='password' id='password' required/>
          <div className='center space-between ' id='m-10'>
            <Link href={`/login/resend`}>Resend Verification Link</Link>
            <Link href={`/login/forgot`}>forgot password</Link>
          </div>
          <div className="resister">
            <button type='submit' className='form-input hover' >Login</button>
            <Link href={`/login/resistration`} className='form-input hover' >Resister New</Link>
          </div>
        </form>
        :
        
        <div className="profile">
      
          <p className="profile-tag">
            <span>Email: </span>
            {student.email}
          </p>
          <h2 className="profile-tag">
            <span>Name: </span>
            {student.name}
          </h2>
          <h2 className="profile-tag">
            <span>University: </span>
            {student.university}
          </h2>
          <h2 className="profile-tag">
            <span>Course: </span>
            {student.course}
          </h2>
          <h2 className="profile-tag">
            <span>Branch: </span>
            {student.branch}
          </h2>
          <h2 className="profile-tag">
            <span>Semester: </span>
            {student.semester}
          </h2>
          <Link href={`/login/logout`} className="profile-tag"> Logout</Link>
        </div>
      }
    </div>
  )
}
