import React, { useRef } from "react";
import Priority from "./Priority";
import SubtaskDropdown from "./SubtaskDropdown";
import { Close, CurvedArrow, Edit } from "../../icons";
import { useDeleteTodo, useEditTodo } from "../../hooks";
import { useQueryClient } from "@tanstack/react-query";

const Todos = ({ todos, isFetchingTodos }) => {
  const queryClient = useQueryClient();
  const deletingTodoRef = useRef();

  const { deleteTodo, isLoading } = useDeleteTodo({
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const { editTodo } = useEditTodo({
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  if (todos.data.length === 0) {
    return (
      <div className='mx-auto mt-1 flex justify-center'>
        <span className='font-mono text-xl font-semibold transition-all dark:font-normal dark:text-white'>Start by adding some tasks!</span>
        <CurvedArrow className='inline h-12 w-12 -translate-y-3 rotate-90 skew-x-12 -scale-x-100 transform text-indigo-500 transition-all' />
      </div>
    );
  }

  return (
    <div
      className={`${
        isFetchingTodos ? "pointer-events-none opacity-50" : ""
      } isolate m-4 mx-auto h-full w-full max-w-4xl place-items-center space-y-7 pt-4 font-sans text-xl transition-all`}
    >
      {todos.data.map((todo) => (
        <div
          className={`isolate mx-auto h-full w-full max-w-4xl rounded-lg border-2 border-slate-300 bg-white transition-all dark:border-slate-500 dark:bg-slate-800 dark:text-white ${
            todo.done ? "border-green-600 dark:border-green-500" : ""
          } ${isLoading && deletingTodoRef.current === todo.id ? "pointer-events-none opacity-50" : ""}`}
          key={todo.id}
        >
          <div className='relative flex items-center justify-between p-4'>
            <div className='flex items-center'>
              <Priority priority={todo.priority} />
              <input
                className='h-6 w-6 cursor-pointer rounded-lg border-2 border-slate-300 bg-slate-100 outline-none !ring-green-600 ring-offset-2 transition-all checked:text-green-600 hover:bg-slate-200 checked:hover:text-green-700 focus:ring dark:border-slate-500 dark:bg-slate-600 dark:ring-offset-slate-900 dark:checked:border-green-600 dark:checked:bg-green-600 dark:hover:bg-slate-700 dark:checked:hover:border-green-700 dark:checked:hover:bg-green-700 md:h-8 md:w-8'
                type='checkbox'
                checked={todo.done}
                onChange={() => {
                  todo.done = !todo.done;
                  console.log(todo);
                  editTodo(todo);
                }}
              />
              <p className={`inline-flex pt-2 pl-4 font-bold ${todo.done ? "text-green-600 line-through dark:text-green-500" : ""}`}>
                {todo.title}
              </p>
            </div>
            <div className='flex items-center'>
              <button
                type='button'
                className='ml-2 h-10 rounded-md bg-orange-500 pl-2 pr-3 text-lg text-white hover:bg-orange-600 active:scale-95'
              >
                <div className='flex'>
                  <Edit className='h-7 w-7 pr-1' /> Edit
                </div>
              </button>
              <button
                type='button'
                onClick={() => {
                  deletingTodoRef.current = todo.id;
                  deleteTodo(todo.id);
                }}
                className='ml-2 h-10 rounded-md bg-red-500 pl-3 pr-3 text-lg text-white hover:bg-red-600 active:scale-95'
              >
                <Close />
              </button>
            </div>
          </div>
          {todo.description && <p className='pl-12 pb-4'>{todo.description}</p>}
          {todo.subTasks.length > 0 && <SubtaskDropdown subtasks={todo.subTasks} />}
        </div>
      ))}
    </div>
  );
};

export default Todos;
