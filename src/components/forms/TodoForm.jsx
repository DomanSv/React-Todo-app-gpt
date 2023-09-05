import { Controller, useFieldArray, useForm } from "react-hook-form";
import Input from "./Input";
import { Close } from "../../icons";

export default function TodoForm(props) {
  const { children, onSubmit, title, todoData } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: todoData,
  });

  const { fields, append, remove } = useFieldArray({
    rules: { maxLength: 5 },
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "subTasks", // unique name for your Field Array
  });
  
  return (
    <div className='max-w-[500px] w-full p-2 transition-all'>
          <div>
      <h1 className='my-4 text-center text-2xl font-semibold underline transition-all dark:text-white md:text-4xl'>{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='pb-1'>
          <label className='font-semibold dark:text-white'>Приоритет</label>
        </div>
        <select
          className='block w-full rounded-md border-gray-300 transition-shadow focus:border-indigo-500 focus:bg-white focus:ring focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-slate-500 dark:text-white dark:ring-offset-slate-900 dark:placeholder:text-slate-200 dark:focus:bg-slate-600'
          name='priority'
          id='priority'
          {...register("priority")}
        >
          <option value='low'> 😎🤙Нисък</option>
          <option value='mid'>😑👍Среден</option>
          <option value='high'> 😵‍💫⚠️Висок</option>
        </select>
        <Input
          type='text'
          placeholder='Въведете заглавие'
          label={<h1 className='pt-1 font-semibold dark:text-white'>Заглавие</h1>}
          error={errors}
          {...register("title", {
            required: { value: true, message: "Заглавието е задължително!" },
            minLength: { value: 2, message: "Заглавието трябва да е поне 2 знака!" },
            maxLength: { value: 50, message: "Заглавието трябва да е по-късо от 50 знака" },
          })}
        />

        <div className='pt-1'>
          <div className='pb-1'>
            <label className='font-semibold dark:text-white'>Описание</label>
          </div>
          <textarea
            type='textarea'
            placeholder='Въведете описание'
            {...register("description", {
              required: { value: false },
              maxLength: { value: 500, message: "Описанието трябва да е по-късо от 500 знака" },
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
              + Добави Подзадача{" "}
              <span role='img' aria-label='scroll'>
                📜
              </span>
            </span>
          </button>
        </div>

        {fields.map((field, index) => (
          <div className='mt-2 flex flex-col' key={field.id}>
            <div className='mb-1'>
              <label className='dark:text-white'>{`Подзадача #${index + 1}`}</label>
            </div>
            <div className='flex w-full'>
              <Controller
                control={control}
                name={`subTasks.${index}.title`}
                rules={{
                  required: { value: true, message: "Подзадачата е задължителна!" },
                  minLength: { value: 2, message: "Подзадачата трябва да е поне 2 знака!" },
                  maxLength: { value: 50, message: "Подзадачата трябва да е по-късо от 50 знака" },
                }}
                render={({ field, fieldState: { error } }) => <Input placeholder='Въведете подзадача' type='text' {...field} error={error} />}
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
    </div>
  );
}
