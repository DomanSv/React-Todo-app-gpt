import { useState } from "react";
import { useAuth } from "../context/Auth";
import { AccountCircle, DarkMode, ExpandMore, LightMode, Loading, SystemColor } from "../icons";

const NavigationBar = () => {
  const { account, logOut, isLoading } = useAuth();
  const username = account?.username;
  const [theme, setTheme] = useState("System");

  return (
    <nav className='sticky top-0 z-10 h-14 bg-blue-500 bg-opacity-75 px-4 shadow-lg'>
      <div className='mx-auto h-full w-full max-w-4xl space-x-2'>
        <button className='outline-non peer relative mt-2 ml-1 inline-flex w-full select-none justify-center gap-1 rounded-md border-2 border-blue-900 bg-gray-200 py-1 px-3 text-base font-semibold leading-none text-blue-900 ring-offset-2 transition-all hover:bg-gray-300 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto'>
          {isLoading ? (
            <Loading className='h-5 w-5 animate-spin font-extrabold text-blue-900' />
          ) : (
            <div className='inline-flex'>
              <AccountCircle className='mr-2 h-7 w-7 text-blue-900' /> <p className='text-xl'>{username}</p>
              <ExpandMore className='ml-1 h-7 w-7 text-blue-900' />
            </div>
          )}
        </button>
        <div
          className='hidden w-[200px] flex-col
         rounded-md
         border-2 border-blue-500 bg-sky-100 drop-shadow-lg hover:flex peer-hover:flex'
        >
          <a className='mt-2 ml-3 mb-1 flex'>Theme: {theme}</a>
          <div className='ml-2 mr-2 inline-flex justify-center rounded-md bg-blue-300 pb-2'>
            <button
              className={`mt-2 ml-3 mr-3 h-full w-full rounded-md p-1 bg-${
                theme === "System" ? "blue-500" : "blue-300"
              } px-2 text-black hover:bg-blue-500`}
              onClick={() => setTheme("System")}
            >
              <SystemColor className='h-8 w-8' />
            </button>
            <button
              className={`mt-2 h-full w-full rounded-md p-1 bg-${
                theme === "Light" ? "blue-500" : "blue-300"
              } px-2 text-black hover:bg-blue-500`}
              onClick={() => setTheme("Light")}
            >
              <LightMode className='h-8 w-8' />
            </button>
            <button
              className={`mt-2 ml-3 mr-3 h-full w-full rounded-md p-1 bg-${
                theme === "Dark" ? "blue-500" : "blue-300"
              } px-2 text-black hover:bg-blue-500`}
              onClick={() => setTheme("Dark")}
            >
              <DarkMode className='h-8 w-8' />
            </button>
          </div>

          <button
            className='outline-non mt-3 mb-3 mr-3 ml-3 inline-flex w-full select-none justify-center gap-1 rounded-md border-2 border-transparent bg-red-500 py-1 px-3 text-base font-semibold leading-none text-white transition-all hover:bg-red-600 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-slate-900 sm:w-auto'
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
