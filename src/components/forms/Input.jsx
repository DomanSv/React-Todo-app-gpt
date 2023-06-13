import { forwardRef } from "react";

function Input(props, ref) {
  const { error, name, id = name, label, ...rest } = props;
  const inputError = error?.[name]?.message;

  return (
    <div className='w-full'>
      <label htmlFor={id} className='flex flex-col gap-1'>
        {label && <span>{label}</span>}
        <input
          className='relative block w-full rounded-md border px-3 py-2 focus:border-indigo-500 focus:bg-white focus:ring focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-slate-500 dark:text-white dark:ring-offset-slate-900 dark:placeholder:text-slate-200 dark:focus:bg-slate-600'
          name={name}
          id={id}
          {...rest}
          ref={ref}
        />
        {inputError && <span className='text-red-500'>{inputError}</span>}
      </label>
    </div>
  );
}

export default forwardRef(Input);
