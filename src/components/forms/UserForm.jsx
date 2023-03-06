import Input from "../../components/forms/Input";
import Password from "../../components/forms/Password";

export default function UserForm(props) {
    const{ serverError, user, onSubmit, handleSubmit, errors, isLoading} = props;
 
    const formStyle = {
      width: '50%',
      margin: 'auto',
      backgroundColor: '#FFE66D',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <Input
          type='text'
          placeholder='Username'
          label='Username'
          error={errors}
          
          {...user("username", {
            required: { value: true, message: "Username field is required!" },
            minLength: { value: 2, message: "Username must be atleast 2 characters!" },
            maxLength: { value: 50, message: "Username must be less than 50 characters!" },
          })}
        />
        <Password errors={errors} user={user} />
        {isLoading && "Loading..."}
        {Boolean(serverError) && <div className='bg-red-600 text-white'>{serverError}</div>}
        <button className='my-4 border p-2 bg-blue-100'>Submit</button>
      </form>
    );

}