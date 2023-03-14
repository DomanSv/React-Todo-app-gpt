import Password from "../../components/forms/Password";
import { useForm } from "react-hook-form";
import Username from "./Username";

export default function UserForm(props) {
  const { onSubmit, children } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      className='z-10 w-full max-w-md rounded-2xl border-2 border-slate-300 bg-cyan-900 px-6 py-12 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-white'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Username errors={errors} register={register} />
      <Password errors={errors} register={register} />
      {children}
    </form>
  );
}
