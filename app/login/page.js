"use client"
import Link from 'next/link';
import React from 'react';
import {currUrl} from '/mongo/exp2';
import {useAuth} from '/mongo/AuthProvider'

export default function Page() {
  const [password , setPass] = React.useState("");
  const [email , setEmail] = React.useState("");
  let USER = useAuth();
  let student = USER.user;
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
          <div className='center space-between'>
            <Link href={`/login/resend`}>Resend Verification Link</Link>
            <Link href={`/login/forgot`}>forgot password</Link>
          </div>
          <div className="resister">
            <button type='submit' className='form-input hover' >Login</button>
            <Link href={`/login/resistration`} className='form-input hover' >Resister New</Link>
          </div>
        </form>
        :
        // <Link href={`/`}>Aready Logged In : go back</Link>
        <div className="center">
      
          <p className="profile-tag">
            <span>Email: </span>
            {student.email}
          </p>
          <h2 className="profile-tag">
            <span>Name: </span>
            {student.name}
          </h2>
          {/* <h2 className="profile-tag">
            <span>Age: </span>
            {student.age}
          </h2>
          <h2 className="profile-tag">
            <span>Gender: </span>
            {student.gender}
          </h2>
          <h2 className="profile-tag">
            <span>Address: </span>
            {student.address}
          </h2>
          <h2 className="profile-tag">
            <span>City: </span>
            {student.city}
          </h2>
          <h2 className="profile-tag">
            <span>State: </span>
            {student.state}
          </h2>
          <h2 className="profile-tag">
            <span>Pin code: </span>
            {student.pin_code}
          </h2> */}
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
          <button onClick={USER.logout}> Logout</button>
        </div>
      }
    </>
  )
}
