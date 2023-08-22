import React from "react";
import Input from "../../components/forms/Input";

export default function Username(props) {
  const { errors, register } = props;

  return (
    <Input
      type='text'
      placeholder='Въведете потребителско име'
      label={<h1 className='dark:text-white'>Потребителско име</h1>}
      error={errors}
      {...register("username", {
        required: { value: true, message: "Полето за потребителско име е задължително!" },
        minLength: { value: 2, message: "Потребителското име трябва да е поне 2 знака!" },
        maxLength: { value: 50, message: "Потребителското име трябва да е по-малко от 50 знака!" },
      })}
    />
  );
}
