import { Controller, useFieldArray, useForm } from "react-hook-form";
import Input from "./Input";
import { Close } from "../../icons";

export default function TodoForm(props) {
  const { children, todo } = props;

  const onSubmit = (data) => {
    console.log(data);
    todo(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    rules: { maxLength: 5 },
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "subTasks", // unique name for your Field Array
  });

  return (
    <div className='w-[500px] transition-all'>
      <h1 className='my-4 text-center text-2xl font-semibold underline transition-all dark:text-white md:text-4xl'>Add Todo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='pb-1'>
          <label className='font-semibold dark:text-white'>Priority</label>
        </div>
        <select
          className='block w-full rounded-md border-gray-300 transition-shadow focus:border-indigo-500 focus:bg-white focus:ring focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-slate-500 dark:text-white dark:ring-offset-slate-900 dark:placeholder:text-slate-200 dark:focus:bg-slate-600'
          name='priority'
          id='priority'
          {...register("priority")}
        >
          <option value='low'> 😎🤙Low</option>
          <option value='mid'>😑👍Medium</option>
          <option value='high'> 😵‍💫⚠️High</option>
        </select>
        <Input
          type='text'
          placeholder='Enter title'
          label={<h1 className='pt-1 font-semibold dark:text-white'>Title</h1>}
          error={errors}
          {...register("title", {
            required: { value: true, message: "Title field is required!" },
            minLength: { value: 2, message: "Title must be atleast 2 characters!" },
            maxLength: { value: 50, message: "Title must be less than 50 characters!" },
          })}
        />

        <div className='pt-1'>
          <div className='pb-1'>
            <label className='font-semibold dark:text-white'>Description</label>
          </div>
          <textarea
            type='textarea'
            placeholder='Enter description'
            {...register("description", {
              required: { value: false },
              minLength: { value: 2, message: "Description must be atleast 2 characters!" },
              maxLength: { value: 500, message: "Description must be less than 500 characters!" },
            })}
            className='block min-h-[7rem] w-full rounded-md border transition-shadow focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-slate-500 dark:text-white dark:ring-offset-slate-900 dark:placeholder:text-slate-200 dark:focus:bg-slate-600'
            {...register("description")}
          ></textarea>
        </div>
        <div className='inline-flex w-full'>
          <button
            className='relative mt-2 w-full select-none items-center justify-center rounded-md border-2 border-indigo-500 bg-white p-3 text-base font-semibold leading-none text-indigo-600 outline-none ring-indigo-500 ring-offset-2 transition-all hover:bg-indigo-100 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:border-indigo-600 dark:bg-transparent dark:text-indigo-400 dark:ring-indigo-500 dark:ring-offset-slate-900 dark:hover:bg-indigo-900'
            type='button'
            onClick={() => {
              if (fields.length < 5) {
                append();
              }
            }}
          >
            <span>
              + Add Subtask{" "}
              <span role='img' aria-label='scroll'>
                📜
              </span>
            </span>
          </button>
        </div>

        {fields.map((field, index) => (
          <div className='mt-2 flex flex-col' key={field.id}>
            <div className='mb-1'>
              <label className='dark:text-white'>{`Subtask#${index + 1}`}</label>
            </div>
            <div className='flex w-full'>
              <Controller
                control={control}
                name={`subTasks.${index}.title`}
                rules={{
                  required: "Subtask title is required!",
                  minLength: { value: 2, message: "Subtask title must be atleast 2 characters!" },
                  maxLength: { value: 50, message: "Subtask title must be less than 50 characters!" },
                }}
                render={({ field, fieldState: { error } }) => <Input placeholder='Enter Subtask' type='text' {...field} error={error} />}
              />
              <button
                type='button'
                className='ml-2 h-10 rounded-md bg-red-500 pl-3 pr-3 text-lg text-white'
                onClick={() => {
                  remove(index);
                }}
              >
                <Close />
              </button>
            </div>
          </div>
        ))}

        {children}
      </form>
    </div>
  );
}
