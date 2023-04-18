import UserForm from "../../components/forms/UserForm";
import { useLogin } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../icons";
import { useAuth } from "../../context/Auth";

export default function Login() {
  const navigateTo = useNavigate();

  const {setToken} = useAuth();

  const {
    login: loginUser,
    isLoading,
    error,
  } = useLogin({
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigateTo("/");
    },
  });

  const onSubmit = (data) => {
    loginUser(data);
  };

  const serverError = error?.response?.data?.message;

  return (
    <div className='relative isolate mx-auto mt-6 grid h-full w-full max-w-4xl place-items-center space-y-4 bg-sky-500'>
      <p className='w-100 m-2 text-center text-3xl font-bold'>Login</p>
      <UserForm onSubmit={onSubmit}>
        {Boolean(serverError) && <div className='mb-2 rounded-md bg-red-600 text-white'>{serverError}</div>}
        {isLoading && <Loading className='m-2 h-8 w-8 animate-spin font-bold text-white' />}
        <button className='relative inline-flex w-full select-none items-center justify-center gap-1 rounded-md border-2 border-transparent bg-cyan-500 py-4 px-6 text-base font-semibold leading-none text-white outline-none ring-cyan-600 ring-offset-2 transition-all hover:bg-cyan-600 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-slate-900 sm:w-auto'>
          Login
        </button>
      </UserForm>
      <h1>
        Don&apos;t have an account?{" "}
        <Link className='underline' to='/register'>
          Sign up
        </Link>
      </h1>
    </div>
  );
}
