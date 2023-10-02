'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

function Page() {
  const [id , setId] = React.useState('');
  const router = useRouter();
  const handleInput = e => {
    setId(e.target.value);
  }

  return (
    <>
      <h2>It is User Page</h2>
      <input type="text" value={id} onChange={handleInput}/>
      <button onClick={() => router.replace(`/user/${id}`)}>fetch</button>
    </>
  )
}

export default Page
