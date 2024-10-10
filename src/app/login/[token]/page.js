"use client"
import { useState } from 'react'
import {useAuth} from '../../_components/AuthProvider';

export default function Page({params , searchParams}) {
  let USER = useAuth();
    let [pass , setPass ] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        let info = await fetch(`/api/users/${params.token}` , {
                    method:'post',
                    body:JSON.stringify({pass , email:searchParams.e})
                })
                .then(res => res.json())
                .catch(err =>{return  {success:false , message:"bad request@"}})

        if(info.success) {
            alert(`${info.message} Now go back and login`)
        }
        else {
            alert(`${info.message}`)            
        }
    }

  return (
    <div className="flex items-center justify-center h-nav">
      {!USER.user ?
            <form className="bg-white dark:bg-gradient-to-b  dark:from-blue-900 dark:via-cyan-950/90 dark:to-blue-950 shadow-[0_0_10px_black] dark:shadow-[0_0_4px_white] px-2 py-8 flex flex-col gap-3 items-center justify-center w-[98%] max-w-[650px] rounded-xl" onSubmit={handleSubmit} autoComplete="on">
                <h1 className=" mx-auto rounded-xl text-xl font-bold text-center w-fit text-yellow-600">Verify Your Email</h1>
                <input type="password" name = 'email'  className="bg-slate-950/10 focus:bg-violet-800/20 w-[95%] xs:w-[80%] font-semibold shadow-[0_0_2px_gray_inset] focus:shadow-[0_0_3px_black_inset] dark:shadow-[0_0_3px_white_inset] py-2 px-4 text-md rounded-lg text-center outline-none" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="enter password" required/>
                <button type='submit' className='w-[95%] xs:w-[80%] font-semibold text-white bg-red-800 hover:bg-red-600 active:bg-violet-900 py-2 focus:bg-cyan-950 px-4 rounded-xl mx-auto text-center' >verify</button>
            </form>
        :
          <h1 className="max-w-[95%] mx-auto py-4 px-8 rounded-xl text-xl font-bold bg-cyan-950 text-center w-fit shadow-[0_0_5px_white] text-yellow-600">You are already logged-in with email: {USER.user.email}</h1>
      }
    </div>
  )
}
