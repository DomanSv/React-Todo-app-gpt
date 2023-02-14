import { forwardRef } from "react";

function Input (props, ref) {
    const {error, name, id = name, label, ...rest} = props;
    const inputError = error?.[name]?.message;
return (
<label htmlFor={id} className='flex flex-col gap-2'>
    {label && <span>{label}</span>}
<input name={name} id={id} {...rest} ref={ref}/>
{inputError && <span className='text-red-500'>{inputError}</span>}
</label>
);
}

export default forwardRef(Input);