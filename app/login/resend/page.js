"use client"
import React from "react"
// import {currUrl} from '/mongo/exp2';
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
        // console.log("jack");
    }
    return (
        <>
        {!USER.user ? 
            <form className="form-cant" onSubmit={handleSubmit} autoComplete="on">
                <input type="email" name = 'email'  className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter email" required/>
                <button type="submit" className="form-input" >Resend verification mail</button>
            </form>
            :
            <h1 className="center">You are already logged-in</h1>
        }
        </>
    )
}