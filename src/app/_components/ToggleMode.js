import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from './AuthProvider';
import axios from 'axios';


export default function ToggleMode() {
  const { theme , setTheme } = useAuth();
    const toggleMode = () => {
      axios.put("/api" , { theme:theme === "dark" ? "" : "dark" })
          .catch(error => console.log(error.message));
      setTheme(prev => prev === "dark" ? "" : "dark");
    }
  return (
    <div className='group cursor-pointer *:rounded-full flex items-center justify-center h-8 w-8 mx-auto p-6 lg:p-[23px] my-2 lg:my-0 rounded-full lg:ml-2 hover:ring-2 ring-gray-200  hover:bg-slate-950/30 dark:hover:bg-gray-200/15' onClick={toggleMode}>
      {
        theme === "dark" ?
        <FontAwesomeIcon icon={faSun} className='p-2 shadow-[0_0_1px_white] text-2xl text-white ring-1 ring-gray-200 group-hover:ring-0' id='dark'/>
        :
      <FontAwesomeIcon icon={faMoon} className='text-white bg-gray-950/20 text-[1.65rem] py-[6px] px-[9px] shadow-[0_0_2px_gray] group-hover:shadow-none' id='light'/>
      }
    </div>
  )
}
