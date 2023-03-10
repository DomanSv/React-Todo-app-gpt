import React from "react";
import Input from "../../components/forms/Input";

export default function Username(props) {
  const { errors, register } = props;

  return (
    <div>
      <Input
        type='text'
        placeholder='Enter Username'
        label={<h1 className='text-white'>Username</h1>}
        error={errors}
        {...register("username", {
          required: { value: true, message: "Username field is required!" },
          minLength: { value: 2, message: "Username must be atleast 2 characters!" },
          maxLength: { value: 50, message: "Username must be less than 50 characters!" },
        })}
      />
    </div>
  );
}
