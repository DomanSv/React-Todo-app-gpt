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
        placeholder='Въведете парола'
        label={<h1 className='mt-2 dark:text-white'>Парола</h1>}
        error={errors}
        {...register("password", {
          required: { value: true, message: "Полето за парола е задължително!" },
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            message: "Паролата трябва да съдържа минимум 8 знака с поне 1 главна буква, 1 малка буква и 1 цифра",
          },
        })}
      />
      <button
        type='button'
        onClick={() => setPassVisible((v) => !v)}
        className='mt-1 mb-2 inline-flex rounded-lg p-1 text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800'
      >
        {passVisible ? <ClosedEye className='h-7 w-7' /> : <Eye className='h-7 w-7' />}
      </button>
    </div>
  );
}
