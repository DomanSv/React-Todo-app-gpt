import { useState } from "react";
import React from "react";
import Input from "../../components/forms/Input";
import { ClosedEye, Eye } from "../../icons";

export default function Password(props) {
  const { errors, user } = props;
  const [passVisible, setPassVisible] = useState(false);

  return (
    <div>
      <Input
        type={passVisible ? "text" : "password"}
        placeholder='Password'
        label='Password'
        error={errors}
        {...user("password", {
          required: { value: true, message: "Password field is required!" },
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            message: "Password must be minimum 8 characters with atleast 1 uppercase character, 1 lowercase character and 1 number",
          },
        })}
      />
      <button type='button' onClick={() => setPassVisible((v) => !v)} className='text-blue-600'>
        {passVisible ? <ClosedEye className='h-7 w-7' /> : <Eye className='h-7 w-7' />}
      </button>
    </div>
  );
}
