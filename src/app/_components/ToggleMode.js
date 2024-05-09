import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function ToggleModeB() {
    const toggleMode = e => {
        document.querySelector('#dark').classList.toggle('hidden');
        document.querySelector('#light').classList.toggle('hidden');
        document.body.classList.toggle('dark');
    }
  return (
    <div className='cursor-pointer *:bg-gray-400 *:rounded-full flex items-center *:hover:scale-110 justify-center h-8 w-8 mx-auto py-8 lg:py-0' onClick={toggleMode}>
      <FontAwesomeIcon icon={faSun} size='1x' className='p-2 text-white' id='dark'/>
      <FontAwesomeIcon icon={faMoon} size='1x' className='text-slate-900 py-2 px-[10px] hidden' id='light'/>
    </div>
  )
}
