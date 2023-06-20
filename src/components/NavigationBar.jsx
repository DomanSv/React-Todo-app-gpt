import { useAuth } from "../context/Auth";
import { AccountCircle, DarkMode, ExpandMore, LightMode, Loading, SystemColor } from "../icons";
import { useTheme } from "../context/Theme";

const NavigationBar = ({ username, isLoading }) => {
  const { theme, setTheme } = useTheme();
  const { logOut } = useAuth();

  return (
    <nav className='sticky top-0 z-10 h-14 bg-blue-500 bg-opacity-75 px-4 shadow-lg transition-all dark:bg-slate-600 dark:bg-opacity-50'>
      <div className='mx-auto h-full w-full max-w-4xl space-x-2'>
        <button className='outline-non peer relative mt-2 ml-1 inline-flex w-full select-none justify-center gap-1 rounded-md border-2 border-slate-300 bg-ingigo-600 py-1 px-3 text-base font-semibold leading-none text-white ring-offset-2 transition-all hover:bg-indigo-700 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 bg-indigo-600 dark:hover:bg-indigo-700 sm:w-auto'>
          {isLoading ? (
            <Loading className='h-5 w-5 animate-spin font-extrabold text-white' />
          ) : (
            <div className='inline-flex'>
              <AccountCircle className='mr-2 h-7 w-7 text-slate-200' /> <p className='text-xl'>{username}</p>
              <ExpandMore className='ml-1 h-7 w-7 text-white' />
            </div>
          )}
        </button>
        <div
          className='hidden w-[200px] flex-col
         rounded-md
         border-2 border-blue-400 bg-sky-100 drop-shadow-lg hover:flex peer-hover:flex dark:border-slate-400 dark:bg-slate-600'
        >
          <a className='mt-2 ml-3 mb-1 flex dark:text-white'>Theme: {theme}</a>
          <div className='ml-2 mr-2 inline-flex justify-center rounded-md bg-blue-300 pb-2 dark:bg-slate-800  dark:text-white'>
            <button
              className={`mt-2 ml-3 mr-3 h-full w-full rounded-md p-1 bg-${
                theme === "system"
                  ? "blue-500 dark:bg-indigo-600 dark:hover:bg-indigo-600"
                  : "blue-300 dark:bg-slate-800 dark:hover:bg-slate-500"
              } px-2 text-black hover:bg-blue-500 dark:text-white `}
              onClick={() => setTheme("system")}
            >
              <SystemColor className='h-8 w-8' />
            </button>
            <button
              className={`mt-2 h-full w-full rounded-md p-1 bg-${
                theme === "light" ? "blue-500" : "blue-300 dark:bg-slate-800 dark:hover:bg-slate-500"
              } px-2 text-black hover:bg-blue-500 dark:text-white `}
              onClick={() => setTheme("light")}
            >
              <LightMode className='h-8 w-8' />
            </button>
            <button
              className={`mt-2 ml-3 mr-3 h-full w-full rounded-md p-1 bg-${
                theme === "dark"
                  ? "blue-500 dark:bg-indigo-600 dark:hover:bg-indigo-600"
                  : "blue-300 dark:bg-slate-800 dark:hover:bg-slate-500"
              } px-2 text-black hover:bg-blue-500 dark:text-white`}
              onClick={() => setTheme("dark")}
            >
              <DarkMode className='h-8 w-8' />
            </button>
          </div>

          <button
            className='outline-non mt-3 mb-3 mr-3 ml-3 inline-flex select-none justify-center gap-1 rounded-md border-2 border-transparent bg-red-500 py-1 px-3 text-base font-semibold leading-none text-white transition-all hover:bg-red-600 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-slate-900 sm:w-auto'
            onClick={logOut}
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
