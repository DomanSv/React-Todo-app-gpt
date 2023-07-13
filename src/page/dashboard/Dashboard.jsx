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
      <div className='mx-auto px-12 py-3 mt-5 max-w-fit'>
      <button
            tabIndex={-1}
            className='mr-4 w-full select-none space-x-2 rounded-md bg-indigo-600 py-4 px-4 text-lg font-semibold leading-none text-white transition-all hover:bg-indigo-700 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto'
          >
            Filter Status
          </button>
                  <button
            tabIndex={-1}
            className='ml-4 mr-4 w-full select-none space-x-2 rounded-md bg-indigo-600 py-4 px-4 text-lg font-semibold leading-none text-white transition-all hover:bg-indigo-700 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto'
          >
            Filter Priority
          </button>
        <Link to='/add'>
          <button
            tabIndex={-1}
            className='ml-4 w-full select-none space-x-2 rounded-lg bg-indigo-600 py-4 px-4 text-lg font-semibold leading-none text-white transition-all hover:bg-indigo-700 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto border-2 border-orange-500'
          >
            + Add Todo
          </button>
        </Link>
      </div>
      
      {tasksIsLoading ? (
        <div className='flex justify-center mt-4'>
          <Loading className='h-10 w-10 animate-spin font-extrabold text-indigo-600 dark:text-white' />
        </div>
      ) : (
        <Todos todos={todos} isFetchingTodos={tasksIsFetching}/>
      )}
    </div>
  );
}
