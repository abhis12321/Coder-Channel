"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Button(props) {
    const route = useRouter();
    const hanldeClick = ()=> {
        route.push(`/form2/${props.id}`);
    }
  return (
    <button onClick={hanldeClick}>Update</button>
  )
}