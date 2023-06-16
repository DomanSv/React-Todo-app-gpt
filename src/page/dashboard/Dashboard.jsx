import { Link, Navigate } from "react-router-dom";
import Greetings from "../../components/Greetings";
import { useAuth } from "../../context/Auth";
import NavigationBar from "../../components/NavigationBar";

export default function Dashboard() {
  const { authenticated, isLoading, account, token } = useAuth();

  if (!authenticated && !token) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      <NavigationBar username={account?.username} isLoading={isLoading} />
      <div className=' mt-4 text-center text-9xl font-extrabold text-indigo-600 bg-clip-text dark:text-indigo-500 transition-all'>
        TODO
        <Greetings username={account?.username} isLoading={isLoading} />
      </div>
      <div className='mx-auto mt-5 max-w-fit'>
        <Link to='/add'>
        <button tabIndex={-1}
          className='mt-2 ml-1 w-full select-none justify-center space-x-2 rounded-md bg-indigo-600 py-4 px-4 text-lg font-semibold leading-none text-white transition-all hover:bg-indigo-700 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto'
        >
          + Add Todo
        </button>
        </Link>
        <div />
      </div>
    </div>
  );
}
