import { forwardRef } from "react";

function Input(props, ref) {
  const { error, name, id = name, label, ...rest } = props;
  const inputError = error?.[name]?.message;

  return (
    <div>
      <label htmlFor={id} className='flex flex-col gap-2'>
        {label && <span>{label}</span>}
        <input
          className='relative block w-full rounded-md border px-3 py-2 focus:z-50 focus:border-cyan-500 focus:ring-cyan-500'
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
