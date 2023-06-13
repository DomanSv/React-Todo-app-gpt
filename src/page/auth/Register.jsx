import UserForm from "../../components/forms/UserForm";
import { useRegister } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../icons";

export default function Register() {
  const navigateTo = useNavigate();

  const {
    register: registerUser,
    isLoading,
    error,
  } = useRegister({
    onSuccess: () => {
      navigateTo("/login");
    },
  });

  const onSubmit = (data) => {
    registerUser(data);
  };

  const serverError = error?.response?.data?.message;

  return (
    <div className='relative isolate mx-auto mt-6 grid h-full w-full max-w-4xl place-items-center space-y-4 rounded-lg border-2 border-dashed border-blue-900 bg-blue-500 bg-opacity-50 pb-5 pt-4 dark:border-white dark:bg-slate-500'>
      <p className='w-100 m-2 text-center text-3xl font-bold'>Register</p>
      <UserForm onSubmit={onSubmit}>
        {Boolean(serverError) && <div className='mb-2 rounded-md bg-red-600 text-center text-white'>{serverError}</div>}
        {isLoading && <Loading className='m-2 h-7 w-7 animate-spin font-bold text-white' />}
        <button className='ring-value-600 relative inline-flex w-full select-none items-center justify-center gap-1 rounded-md border-2 border-transparent bg-blue-500 py-4 px-6 text-base font-semibold leading-none text-white outline-none ring-offset-2 transition-all hover:bg-blue-600 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-slate-900 sm:w-auto'>
          Submit
        </button>
      </UserForm>
      <h1 className='dark:text-white'>
        Already have an account?{" "}
        <Link className='underline' to='/login'>
          Sign in
        </Link>
      </h1>
    </div>
  );
}
