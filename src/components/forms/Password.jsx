import React from "react";
import Input from "../../components/forms/Input";

export default function Password(props) {
  const { passVisible, errors, register } = props;

  return (
    <Input
      type={passVisible ? "text" : "password"}
      placeholder='Password'
      label='Password'
      error={errors}
      {...register("password", {
        required: { value: true, message: "Password field is required!" },
        pattern: {
          value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          message: "Password must be minimum 8 characters with atleast 1 uppercase character, 1 lowercase character and 1 number",
        },
      })}
    />
  );
}
