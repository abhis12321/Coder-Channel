import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from './AuthProvider';
import axios from 'axios';


export default function ToggleMode() {
  const { themeRef } = useAuth();
  console.log(themeRef?.current?.classList?.contains("dark"))

  const handleToggleMode = (e) => {
    e.preventDefault();
    themeRef.current.classList.toggle("dark");
    e.currentTarget?.dark?.classList?.toggle("hidden");
    e.currentTarget?.light?.classList?.toggle("hidden");

    const theme = themeRef.current.classList.contains("dark");
    axios.put("/api", { theme: theme ? "dark" : "" })   //setting-up theme cookie
      .catch(error => console.log(error.message));
  }

  return (
    <form className="w-[47px] aspect-square mx-auto lg:mx-4 mt-4 lg:my-0 rounded-full cursor-pointer bg-white dark:bg-inherit hover:bg-gray-500 dark:hover:bg-gray-400/30 flex items-center justify-center shadow-[0_0_2px_gray_inset] overflow-hidden text-gray-500 dark:text-white hover:text-white hover:scale-110 duration-500" onSubmit={handleToggleMode}>
      <button className={`h-full w-full text-[1.5rem] ${!themeRef?.current?.classList?.contains("dark") && "hidden"}`} name='dark'>
        <FontAwesomeIcon icon={faSun} className='h-[23px] ' />
      </button>
      <button className={`h-full w-full text-[1.7rem] ${themeRef?.current?.classList?.contains("dark") && "hidden"}`} name='light'>
        <FontAwesomeIcon icon={faMoon} className='h-[25px] ' />
      </button>
    </form>
  )
}
