import { Navigate } from "react-router-dom";
import Greetings from "../../components/Greetings";
import { getStoredToken } from "../../utils/helperfuncs";
import { useAuth } from "../../context/Auth";

export default function Dashboard() {
  const { authenticated, isLoading, account, logOut } = useAuth();

  if (!authenticated && !getStoredToken()) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      <div className='bg-gradient-to-r from-indigo-600 to-sky-500 pb-3 text-center text-9xl font-extrabold text-white'>
        TODO
        <Greetings username={account?.username} isLoading={isLoading} />
      </div>

      <button
        className='relative mt-6 ml-6 inline-flex w-full select-none items-center justify-center gap-1 rounded-md border-2 border-transparent bg-cyan-500 py-4 px-6 text-base font-semibold leading-none text-white outline-none ring-cyan-600 ring-offset-2 transition-all hover:bg-cyan-600 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-slate-900 sm:w-auto'
        onClick={logOut}
      >
        Log Out
      </button>
    </div>
  );
}
