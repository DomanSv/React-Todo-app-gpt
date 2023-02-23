import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/forms/Input";
import Password from "../../components/forms/Password";
import { useRegister } from "../../hooks";
import { ClosedEye, Eye } from "../../icons";

export default function Register() {
  const [passVisible, setPassVisible] = useState(false);

  const {
    register: registerUser,
    isLoading,
    error,
  } = useRegister({
    onSuccess: (res) => {
      console.log(res);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSumbit = (data) => {
    registerUser(data);
    console.log(data);
  };

  const serverError = error?.response?.data?.message;

  return (
    <form onSubmit={handleSubmit(onSumbit)}>
      <Input
        type='text'
        placeholder='Username'
        label='Username'
        error={errors}
        {...register("username", {
          required: { value: true, message: "Username field is required!" },
          minLength: { value: 2, message: "Username must be atleast 2 characters!" },
          maxLength: { value: 50, message: "Username must be less than 50 characters!" },
        })}
      />
      <Password passVisible={passVisible} errors={errors} register={register} />
      <button type='button' onClick={() => setPassVisible((v) => !v)} className='text-violet-600'>
        {passVisible ? <ClosedEye className='h-7 w-7' /> : <Eye className='h-7 w-7' />}
      </button>
      {isLoading && "Loading..."}
      {Boolean(serverError) && <div className='bg-red-600 text-white'>{serverError}</div>}
      <button className='my-4 border p-2'>Submit</button>
    </form>
  );
}
