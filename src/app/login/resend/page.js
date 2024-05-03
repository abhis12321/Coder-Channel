"use client"
import React from "react"
import {useAuth} from '/mongo/AuthProvider'


export default function Page() {
    let USER = useAuth();
    const [email , setEmail] = React.useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        let info = await fetch(`/api/gverify/resend` , {
                        method:"post",
                        body:JSON.stringify({email})
                    })
                    .then(res => res.json())
                    .catch(err => {message:"bad request"})

        alert(`${info.message}`)
    }
    return (
        <div className="flex items-center justify-center min-h-[90.8vh]">
        {!USER.user ? 
            <form className="bg-gradient-to-br from-gray-900 via-cyan-950 to-slate-950 py-8 flex flex-col gap-4 items-center justify-center w-[95%] max-w-[800px] rounded-xl text-white" onSubmit={handleSubmit} autoComplete="on">
                <h1 className=" mx-auto py-4 px-8 rounded-xl text-xl font-bold bg-teal-950 text-center w-fit shadow-[0_0_5px_white] text-yellow-600 my-5">Resend Verification Link</h1>
                <input type="email" name = 'email'  className="bg-slate-950/50 w-[95%] xs:w-[80%] font-semibold shadow-[0_0_3px_white] py-2 px-4 text-md rounded-lg text-center outline-none" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter email" required/>
                <button type='submit' className='w-[95%] xs:w-[80%] font-semibold shadow-[0_0_3px_white] bg-red-900/80 hover:bg-red-700 active:bg-violet-900 py-2 focus:bg-indigo-950 px-4 rounded-xl mx-auto text-center' >Resend</button>
            </form>
            :
            <h1 className="max-w-[95%] mx-auto py-4 px-8 rounded-xl text-xl font-bold bg-cyan-950 text-center w-fit shadow-[0_0_5px_white] text-yellow-600">You are already logged-in with email: <span className="drop-shadow-[0_0_4px_red] text-white">{USER.user.email}</span></h1>
        }
        </div>
    )
}