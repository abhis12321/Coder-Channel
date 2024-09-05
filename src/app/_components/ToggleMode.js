import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from './AuthProvider';
import axios from 'axios';


export default function ToggleMode() {
  const { themeRef } = useAuth();

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
    <form className="h-[45px] aspect-square mx-auto mt-4 md:my-0 md:mx-4 rounded-full cursor-pointer bg-white dark:bg-inherit hover:bg-gray-500 dark:hover:bg-gray-400/30 flex items-center justify-center shadow-[0_0_2px_gray_inset] overflow-hidden text-gray-500 dark:text-white hover:text-white" onSubmit={handleToggleMode}>
      <button className="h-full w-full hidden text-[1.4rem]" name='dark'>
        <FontAwesomeIcon icon={faSun} className='' />
      </button>
      <button className="h-full w-full text-[1.6rem]" name='light'>
        <FontAwesomeIcon icon={faMoon} className='' />
      </button>
    </form>
  )
}
