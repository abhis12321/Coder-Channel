"use client"
import React from 'react'
import {currUrl} from '/mongo/exp2';

export default function Page({params}) {
    let [pass , setPass ] = React.useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        let info = await fetch(`${currUrl}/api/gverify/${params.token}` , {
                    method:'post',
                    body:JSON.stringify(pass)
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
    <form onSubmit={handleSubmit}>
      <input type="password" placeholder='enter the password to verify' id='pass' className='form-input' value={pass} onChange={(e) => setPass(e.target.value)} required/>
      <button type='submit' className='form-input'>verify</button>
    </form>
  )
}
