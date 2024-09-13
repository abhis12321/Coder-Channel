"use client"
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function CopyLink({ text, copyLink, setCopyLink }) {
    const handleCopyURL = () => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopyLink(2);
                setTimeout(() => {
                    setCopyLink(1);
                }, [4000]);
            })
            .catch(error => {
                alert(`Sorry! ${error.message}, Please copy the link manually, Thank you.`);
            })
        }


    return (
        <div className='h-full w-full fixed top-0 left-0 z-[1000] bg-gray-700/15 flex items-center justify-center'>
            <div className="max-w-[98%] px-4 py-[10px] rounded-xl flex flex-wrap flex-col sm:flex-row items-center justify-center gap-1 sm:gap-6 bg-white text-red-950 shadow-[0_0_8px_black] relative">
                <p className="max-w-[98%] font-extrabold font-mono text-wrap overflowauto [overflow-wrap:break-word] [word-wrap:break-word]">{text}</p>
                {copyLink === 1 ?
                    <FontAwesomeIcon size='xs' icon={faCopy} className='h-5 sm:h-[18px] cursor-pointer text-gray-700 hover:text-blue-600' onClick={handleCopyURL} />
                    :
                    <FontAwesomeIcon size='xs' icon={faCheck} className='h-5 sm:h-[18px] cursor-pointer text-green-700 scale-y-150' />
                }
                <div className="absolute top-[-14px] right-[-.5rem] sm:right-[-13px] bg-gray-50 text-red-600 text-xl font-semibold py-[1px] px-[9px] rounded-full ring-2 ring-red-600 hover:bg-red-600 hover:text-white cursor-pointer" onClick={() => setCopyLink(0)}>X</div>
            </div>
        </div>
    )
}
