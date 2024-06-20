"use client"
import React from "react"
import {useAuth} from '../../_components/AuthProvider';

export default function Page() {
    let USER = useAuth();
    const [email , setEmail] = React.useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        let info = await fetch(`/api/users/forgot` , {
                        method:"post",
                        body:JSON.stringify({email})
                    })
                    .then(res => res.json())
                    .catch(err => {message:"bad request"})

        alert(`${info.message}`)
        // console.log(info);
    }
    return (
        <div className="flex items-center justify-center h-nav">
        {!USER.user ?  
            <form className="bg-gradient-to-br from-gray-900 via-cyan-950 to-slate-950 py-12 flex flex-col gap-4 items-center justify-center w-[95%] max-w-[800px] rounded-xl text-white border-2 border-cyan-700" onSubmit={handleSubmit} autoComplete="on">
                <h1 className="mx-auto py-4 px-8 rounded-xl text-xl font-bold bg-teal-950/50 text-center w-fit shadow-[0_0_5px_white] text-yellow-600 mb-4">Resend Verification Link</h1>
                <input type="email" name = 'email'  className="bg-slate-950/40 w-[95%] xs:w-[80%] font-semibold shadow-[0_0_3px_white] py-2 px-4 text-md rounded-lg text-center outline-none" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter email" required/>
                <button type='submit' className='w-[95%] xs:w-[80%] font-semibold shadow-[0_0_3px_white] bg-red-900/80 hover:bg-red-700 active:bg-violet-900 py-2 focus:bg-cyan-950 px-4 rounded-xl mx-auto text-center' >Resend</button>
            </form>
            :
            <h1 className="mx-auto py-4 px-8 rounded-xl text-xl font-bold bg-cyan-950 text-center w-fit shadow-[0_0_5px_white] text-yellow-600">You are already logged-in</h1>
        }
        </div>
    )
}