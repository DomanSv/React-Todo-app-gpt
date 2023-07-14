import { Link, Navigate } from "react-router-dom";
import Greetings from "../../components/Greetings";
import { useAuth } from "../../context/Auth";
import NavigationBar from "../../components/NavigationBar";
import { Loading } from "../../icons";
import Todos from "../../components/todos/Todos";
import { useTodos } from "../../hooks";

export default function Dashboard() {
  const { authenticated, isLoading, account, token } = useAuth();
  const { todos, tasksIsLoading, tasksIsFetching } = useTodos();

  if (!authenticated && !token) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      <NavigationBar username={account?.username} isLoading={isLoading} />
      <div className=' mt-4 bg-clip-text text-center text-9xl font-extrabold text-indigo-600 transition-all dark:text-indigo-500'>
        TODO
        <Greetings username={account?.username} isLoading={isLoading} />
      </div>
      <div className='mx-auto mt-5 max-w-fit px-12 py-3'>
        <button
          tabIndex={-1}
          className='mr-4 w-full select-none space-x-2 rounded-md border-2 border-indigo-500 bg-white bg-opacity-60 py-4 px-4 text-lg font-semibold leading-none transition-all hover:bg-indigo-200 hover:bg-opacity-50 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-500 dark:bg-opacity-30 dark:text-white dark:hover:bg-indigo-700 dark:hover:bg-opacity-50 sm:w-auto'
        >
          Filter Status
        </button>
        <button
          tabIndex={-1}
          className='ml-4 mr-4 w-full select-none space-x-2 rounded-md border-2 border-indigo-500 bg-white bg-opacity-60 py-4 px-4 text-lg font-semibold leading-none transition-all hover:bg-indigo-200 hover:bg-opacity-50 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-500 dark:bg-opacity-30 dark:text-white dark:hover:bg-indigo-700 dark:hover:bg-opacity-50 sm:w-auto'
        >
          Filter Priority
        </button>
        <Link to='/add'>
          <button
            tabIndex={-1}
            className='ml-4 w-full select-none space-x-2 rounded-lg bg-indigo-600 py-4 px-4 text-lg font-semibold leading-none text-white transition-all hover:bg-indigo-700 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto'
          >
            + Add Todo
          </button>
        </Link>
      </div>

      {tasksIsLoading ? (
        <div className='mt-4 flex justify-center'>
          <Loading className='h-10 w-10 animate-spin font-extrabold text-indigo-600 dark:text-white' />
        </div>
      ) : (
        <Todos todos={todos} isFetchingTodos={tasksIsFetching} />
      )}
    </div>
  );
}
