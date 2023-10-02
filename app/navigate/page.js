'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/');
        // router.replace('/');
    }
    return (
        <>
            <button onClick={handleClick}>got to Home</button>
        </>
    )
}

export default Page
