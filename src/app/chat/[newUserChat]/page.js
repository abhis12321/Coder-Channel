'use client'

import React from 'react';
import {useAuth} from '/mongo/AuthProvider';


export default function Page(props) {
  const USER = useAuth();
  const [user , setUser] = React.useState();

  React.useState(async() => {
    fetch(`/api/mongo/form2/${props.params.newUserChat}`)
            .then(res => res.json())
            .then(data => {
              if(data.success)
              setUser(data)
              // console.log(data);
            });
  } , []);

  const handleSendNewMessage = e => {
    e.preventDefault();
  }

  return (
    <div className='live-chat-box'>
      <div className='user-info-for-chat'>
        <h1>{user?.name}</h1>
        <p>loading...</p>
      </div>
      

      <form className='new-message-sending-box' onSubmit={handleSendNewMessage}>
        <input type='text' className='style' />
        <button className='style'>send</button>
      </form>
    </div>
  )
}
