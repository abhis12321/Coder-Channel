import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function ToggleMode() {
    const toggleMode = e => {
        document.querySelector('#dark').classList.toggle('hidden');
        document.querySelector('#light').classList.toggle('hidden');
        document.body.classList.toggle('dark');
    }
  return (
    <div className='group cursor-pointer *:rounded-full flex items-center justify-center h-8 w-8 mx-auto p-6 lg:p-[22px] my-2 lg:my-0 rounded-full lg:ml-2 md:hover:scale-110 hover:ring-2 ring-gray-200  hover:bg-slate-950/30 dark:hover:bg-gray-200/15' onClick={toggleMode}>
      <FontAwesomeIcon icon={faSun} className='p-2 bg-gray-950 shadow-[0_0_1px_white] text-lg text-white ring-1 ring-gray-200 group-hover:ring-0' id='dark'/>
      <FontAwesomeIcon icon={faMoon} className='text-slate-700 bg-gray-200 py-2 px-[10px] hidden' id='light'/>
    </div>
  )
}
