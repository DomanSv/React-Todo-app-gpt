import { forwardRef } from "react";

function Input(props, ref) {
  const { error, name, id = name, label, ...rest } = props;
  const inputError = error?.[name]?.message;

  const inputStyle = {
    backgroundColor: "#f2f2f2",
    border: "none",
    width: "300px",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "16px",
  };

  return (
    <div>
      <label htmlFor={id} className='flex flex-col gap-2'>
        {label && <span>{label}</span>}
        <input name={name} id={id} {...rest} ref={ref} style={inputStyle} />
        {inputError && <span className='text-red-500'>{inputError}</span>}
      </label>
    </div>
  );
}

export default forwardRef(Input);
