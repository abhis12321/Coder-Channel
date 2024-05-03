"use client"
import React from 'react'
import {useAuth} from '/mongo/AuthProvider';

export default function Page({params , searchParams}) {
  let USER = useAuth();
    let [pass , setPass ] = React.useState("");
    // console.log(searchParams.e);

    const handleSubmit = async(e) => {
        e.preventDefault();
        let info = await fetch(`/api/gverify/${params.token}` , {
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
    <div className="flex items-center justify-center min-h-[90.8vh]">
      {!USER.user ?
            <form className="bg-gradient-to-tr from-gray-900 via-cyan-950 to-slate-950 py-12 flex flex-col gap-4 items-center justify-center w-[95%] max-w-[800px] rounded-xl text-white shadow-[0_0_12px_gray]" onSubmit={handleSubmit} autoComplete="on">
                <h1 className=" mx-auto py-4 px-8 rounded-xl text-xl font-bold bg-slate-950/10 text-center w-fit shadow-[0_0_5px_white] text-yellow-600">Verify Your Email</h1>
                <input type="password" name = 'email'  className="bg-slate-950/50 w-[95%] xs:w-[80%] font-semibold shadow-[0_0_3px_white] py-2 px-4 text-md rounded-lg text-center outline-none" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="enter password" required/>
                <button type='submit' className='w-[95%] xs:w-[80%] font-semibold shadow-[0_0_3px_white] bg-red-900/80 hover:bg-red-700 active:bg-violet-900 py-2 focus:bg-cyan-950 px-4 rounded-xl mx-auto text-center' >verify</button>
            </form>
        :
          <h1 className="max-w-[95%] mx-auto py-4 px-8 rounded-xl text-xl font-bold bg-cyan-950 text-center w-fit shadow-[0_0_5px_white] text-yellow-600">You are already logged-in with email: {USER.user.email}</h1>
      }
    </div>
  )
}
