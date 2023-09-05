import Password from "../../components/forms/Password";
import { useForm } from "react-hook-form";
import Username from "./Username";

export default function UserForm(props) {
  const { onSubmit, title, children } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      className='z-10 w-full max-w-md rounded-2xl border-2 border-slate-300 bg-blue-50 px-6 py-6 shadow-xl dark:border-slate-400 dark:bg-slate-700'
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className='w-100 text-center text-3xl font-bold dark:text-white mb-2'>{title}</p>
      <Username errors={errors} register={register} />
      <Password errors={errors} register={register} />
      {children}
    </form>
  );
}
