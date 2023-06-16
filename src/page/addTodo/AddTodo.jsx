import { Link, Navigate, useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";
import { useAuth } from "../../context/Auth";
import { useAddTodo } from "../../hooks";
import TodoForm from "../../components/forms/todoForm";

export default function addTodo() {
  const { authenticated, isLoading, account, token } = useAuth();
  const navigateTo = useNavigate();

  if (!authenticated && !token) {
    return <Navigate to='/login' />;
  }

  const { addTodo: todo, error } = useAddTodo({
    onSuccess: (data) => {
      console.log(data);
      navigateTo("/");
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    todo(data);
  };

  const serverError = error?.response?.data?.message;

  return (
    <div>
      <NavigationBar username={account?.username} isLoading={isLoading} />
      <div className='relative isolate mx-auto mt-6 grid h-full w-full max-w-4xl place-items-center space-y-4 rounded-lg border-2 border-dashed border-blue-900 bg-slate-300 bg-opacity-60 pb-5 pt-4 transition-all dark:border-white dark:bg-slate-800 dark:bg-opacity-50'>
        <TodoForm onSubmit={onSubmit}>
          {Boolean(serverError) && <div className='mb-2 rounded-md bg-red-600 text-center text-white'>{serverError}</div>}
          <div className='mt-3 flex justify-end'>
            <Link to='/'>
              <button
                type='button'
                tabIndex={-1}
                className='relative mr-3 inline-flex select-none justify-center gap-1 rounded-md bg-red-500 py-3 px-4 text-base font-semibold leading-none text-white outline-none ring-offset-2 transition-all hover:bg-red-600 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto'
              >
                Cancel
              </button>
            </Link>
            <button className='peer relative flex select-none justify-center gap-1 rounded-md bg-indigo-500 py-3 px-4 text-base font-semibold leading-none text-white outline-none ring-offset-2 transition-all hover:bg-indigo-600 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto'>
              Create
            </button>
          </div>
        </TodoForm>
      </div>
    </div>
  );
}
