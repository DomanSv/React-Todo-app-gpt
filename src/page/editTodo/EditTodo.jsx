import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { useEditTodo, useTodosById } from "../../hooks";
import TodoForm from "../../components/forms/TodoForm";
import { useQueryClient } from "@tanstack/react-query";
import { Loading } from "../../icons";

export default function EditTodo() {
  const { authenticated, token } = useAuth();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const navigateTo = useNavigate();

  if (!authenticated && !token) {
    return <Navigate to='/login' />;
  }

  const { todo, error, isFetchingTodo } = useTodosById({
    id,
    enabled: Boolean(id),
  });

  const { editTodo } = useEditTodo({
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      navigateTo("/");
    },
  });

  const onSubmit = (data) => {
    editTodo(data);
  };

  const serverError = error?.response?.data?.message;

  if (isFetchingTodo) {
    return (
      <div className='mt-4 flex justify-center'>
        <Loading className='h-10 w-10 animate-spin font-extrabold text-indigo-600 dark:text-white' />
      </div>
    );
  }

  return (
    <div>
      <div className='relative isolate mx-auto mt-6 grid h-full w-full max-w-4xl place-items-center space-y-4 rounded-lg border-2 border-dashed border-blue-900 bg-slate-300 bg-opacity-60 pb-5 pt-4 transition-all dark:border-white dark:bg-slate-800 dark:bg-opacity-50'>
        <TodoForm onSubmit={onSubmit} title='Edit Todo' todoData={todo.data}>
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
              Edit
            </button>
          </div>
        </TodoForm>
      </div>
    </div>
  );
}
