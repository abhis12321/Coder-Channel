import axios from 'axios';
import { useAuth } from './AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';


export default function ToggleMode() {
  const { themeRef } = useAuth();

  const handleToggleMode = (e) => {
    e.preventDefault();
    themeRef.current.classList.toggle("dark");
    e.currentTarget?.dark?.classList?.toggle("hidden");
    e.currentTarget?.light?.classList?.toggle("hidden");
    axios.get("/api");
  }

  return (
    <form className="h-[45px] aspect-square ring-1 ring-white mx-auto lg:ml-[9px] mt-[6px] lg:my-0 rounded-full cursor-pointer bg-white dark:bg-inherit hover:bg-gray-500 dark:hover:bg-gray-400/30 flex items-center justify-center shadow-[0_0_1px_gray] dark:shadow-[0_0_2px_gray_inset] overflow-hidden text-gray-500 dark:text-white hover:text-white duration-500 lg:hover:scale-110" onSubmit={handleToggleMode}>
      <button className={`w-full h-full flex items-center justify-center ${!themeRef?.current?.classList?.contains("dark") && "hidden"}`} name='dark'>
        <FontAwesomeIcon icon={faSun} className='h-[23px]' />
      </button>
      <button className={`w-full h-full flex items-center justify-center ${themeRef?.current?.classList?.contains("dark") && "hidden"} bg-gray-600/15`} name='light'>
        <FontAwesomeIcon icon={faMoon} className='h-[26px]' />
      </button>
    </form>
  )
}
