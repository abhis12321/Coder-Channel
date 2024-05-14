import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function ToggleMode() {
    const toggleMode = e => {
        document.querySelector('#dark').classList.toggle('hidden');
        document.querySelector('#light').classList.toggle('hidden');
        document.body.classList.toggle('dark');
    }
  return (
    <div className='cursor-pointer *:rounded-full flex items-center justify-center h-8 w-8 mx-auto py-8 lg:py-0 lg:ml-2' onClick={toggleMode}>
      <FontAwesomeIcon icon={faSun} className='p-2 bg-gray-950 shadow-[0_0_1px_white] text-lg text-white hover:scale-110  hover:ring-2 ring-gray-200' id='dark'/>
      <FontAwesomeIcon icon={faMoon} className='text-slate-700 bg-gray-200 py-2 px-[10px] hover:scale-110 hidden  hover:ring-2 ring-white' id='light'/>
    </div>
  )
}
