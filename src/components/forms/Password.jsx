import { useState } from "react";
import React from "react";
import Input from "../../components/forms/Input";
import { ClosedEye, Eye } from "../../icons";

export default function Password(props) {
  const { errors, register } = props;
  const [passVisible, setPassVisible] = useState(false);

  return (
    <div>
      <Input
        type={passVisible ? "text" : "password"}
        placeholder='Enter Password'
        label={<h1 className='mt-2 dark:text-white'>Password</h1>}
        error={errors}
        {...register("password", {
          required: { value: true, message: "Password field is required!" },
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            message: "Password must be minimum 8 characters with atleast 1 uppercase character, 1 lowercase character and 1 number",
          },
        })}
      />
      <button type='button' onClick={() => setPassVisible((v) => !v)} className='mt-1 mb-2 inline-flex text-blue-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 p-1'>
        {passVisible ? <ClosedEye className='h-7 w-7' /> : <Eye className='h-7 w-7' />}
      </button>
    </div>
  );
}
