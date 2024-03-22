"use client"


import '../globals.css';
import React from "react";
import { useAuth , handleMessage} from "/mongo/AuthProvider";
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';

function Page() {
    const [content , setContent] = React.useState("");
    const router = useRouter();
    let USER = useAuth();

    // React.useEffect(() => {
    //     if(!USER.user) {
    //         router.push('/login');
    //     }
    //     else {
    //         console.log("mounting.");
    //     }
    // } , [])

    const handleClick = e => {  
        handleMessage(content , USER.user.name , USER.socket); 
        setContent("");
    }

    return (
        <div>
            <div className='chat-box'>
                <h1>Chat Group...</h1>
                <p className='left'>Welcome in this chat group</p>
            </div>

            <div className='center chat-input-form'>
                <input type='text' value = {content} onChange={e => setContent(e.target.value)}  required/>
                <button onClick={handleClick}>click</button>
            </div>

        </div>
    )
}

export default React.memo(Page);