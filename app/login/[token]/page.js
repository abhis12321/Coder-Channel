"use client"
import React from 'react'
import {currUrl} from '/mongo/exp2';
import {useAuth} from '/mongo/AuthProvider'

export default function Page({params , searchParams}) {
  let USER = useAuth();
    let [pass , setPass ] = React.useState("");
    // console.log(searchParams.e);

    const handleSubmit = async(e) => {
        e.preventDefault();
        let info = await fetch(`${currUrl}/api/gverify/${params.token}` , {
                    method:'post',
                    body:JSON.stringify({pass , email:searchParams.e})
                })
                .then(res => res.json())
                .catch(err =>{return  {success:false , message:"bad request"}})

        if(info.success) {
            alert(`${info.message} Now go back and login`)
        }
        else {
            alert(`${info.message}`)            
        }
    }

  return (
    <>
    {!USER.user ?
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder='enter the password to verify' id='pass' className='form-input' value={pass} onChange={(e) => setPass(e.target.value)} required/>
        <button type='submit' className='form-input'>verify</button>
      </form>
      :
      <h1 className="center">You are already logged-in with email: {USER.user.email}</h1>
      }
    </>
  )
}
