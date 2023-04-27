import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";
import { useAuth } from "../../context/Auth";

export default function addTodo() {
  const { isLoading, account } = useAuth();
  const navigateTo = useNavigate();

  return (
    <div>
      <NavigationBar username={account?.username} isLoading={isLoading} />
      <div className='relative isolate mx-auto mt-6 grid h-full w-full max-w-4xl place-items-center space-y-4 rounded-lg border-2 border-dashed border-blue-900 bg-indigo-200 pb-5 pt-4 dark:border-white dark:bg-slate-500'>
        <button
          className='outline-non peer relative mt-2 ml-1 inline-flex w-full select-none justify-center gap-1 rounded-md  bg-red-500 py-3 px-4 text-base font-semibold leading-none text-white ring-offset-2 transition-all hover:bg-red-600 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto'
          onClick={() => navigateTo("/")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
