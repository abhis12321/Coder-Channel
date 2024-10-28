import axios from 'axios'
import { useAuth } from './AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'


export default function ToggleMode() {
  const { themeRef } = useAuth();

  const handleToggleMode = (e) => {
    e.preventDefault();
    themeRef.current.classList.toggle("dark");
    e.currentTarget?.dark?.classList?.toggle("hidden");
    e.currentTarget?.light?.classList?.toggle("hidden");
    axios.get("/api")
  }

  return (
    <form className="w-[47px] aspect-square mx-auto lg:mx-4 mt-4 lg:my-0 rounded-full cursor-pointer bg-white dark:bg-inherit hover:bg-gray-500 dark:hover:bg-gray-400/30 flex items-center justify-center shadow-[0_0_2px_gray_inset] overflow-hidden text-gray-500 dark:text-white hover:text-white hover:scale-105 duration-500 hover:ring-1 ring-gray-500 dark:ring-white" onSubmit={handleToggleMode}>
      <button className={`w-full h-full flex items-center justify-center ${!themeRef?.current?.classList?.contains("dark") && "hidden"}`} name='dark'>
        <FontAwesomeIcon icon={faSun} className='h-[23px]' />
      </button>
      <button className={`w-full h-full flex items-center justify-center ${themeRef?.current?.classList?.contains("dark") && "hidden"}`} name='light'>
        <FontAwesomeIcon icon={faMoon} className='h-[25px]' />
      </button>
    </form>
  )
}
