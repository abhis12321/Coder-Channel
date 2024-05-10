import React from 'react';
import UserRegistration from '../../_components/UserRegistration'

export default function page() {
  return (
    <div className='flex items-center justify-center py-2'  style={{minHeight:'calc(100vh - 4rem)'}}>
      <UserRegistration />
    </div>
  )
}
