import { Link, Navigate } from "react-router-dom";
import Greetings from "../../components/Greetings";
import { useAuth } from "../../context/Auth";
import Todos from "../../components/todos/Todos";

export default function Dashboard() {
  const { authenticated, isLoading, account, token } = useAuth();

  if (!authenticated && !token) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      <div className=' mt-4 bg-clip-text text-center text-9xl font-extrabold text-indigo-600 transition-all dark:text-indigo-500'>
        TODO
        <Greetings username={account?.username} isLoading={isLoading} />
      </div>
      <div className='mx-auto mt-2 max-w-fit px-12 py-3'>
        <Link to='/add'>
          <button
            tabIndex={-1}
            className='ml-4 w-full select-none space-x-2 rounded-lg bg-indigo-600 py-4 px-4 text-lg font-semibold leading-none text-white transition-all hover:bg-indigo-700 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto'
          >
            + Add Todo
          </button>
        </Link>
      </div>
      <Todos />
    </div>
  );
}
