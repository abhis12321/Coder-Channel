import React from 'react';
import UserRegistration from '../../_components/UserRegistration'
import UploadForm from '../../_components/UploadForm'

export default function page() {
  return (
    <div className='flex items-center justify-center py-2 h-nav'>
      <UserRegistration />
      <UploadForm />
    </div>
  )
}
