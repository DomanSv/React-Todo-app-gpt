import { useForm } from "react-hook-form";
import UserForm from "../../components/forms/UserForm";
import { useRegister } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigateTo = useNavigate();

  const {
    register: registerUser,
    isLoading,
    error,
  } = useRegister({
    onSuccess: () => {
      navigateTo('/login');
    },
  });
  
  const divStyle = {
    width: '50%',
    margin: 'auto',
    backgroundColor: '#F7FFF7',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    registerUser(data);
    console.log(data);
  };

  const serverError = error?.response?.data?.message;

  return (
    <div style={divStyle}>
    <p className='text-center m-2 w-100 text-3xl font-bold'>Register</p>
<UserForm serverError={serverError} user={register} onSubmit={onSubmit}
  handleSubmit={handleSubmit} errors={errors} isLoading={isLoading}
/>
<button className='my-4 border p-2 bg-blue-100' onClick={() => {navigateTo('/login');}}>Login</button>
</div>
  );
}
