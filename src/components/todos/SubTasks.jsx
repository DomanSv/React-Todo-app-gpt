import React from "react";
import { Close } from "../../icons";
import { useDeleteSubtask, useEditTodo } from "../../hooks";
import { useQueryClient } from "@tanstack/react-query";

const Subtasks = ({ todo }) => {
  const queryClient = useQueryClient();
  const { editTodo } = useEditTodo({
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const { deleteSubtask } = useDeleteSubtask({
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return (
    <div className='rounded-lg bg-slate-200 p-2 dark:bg-slate-900'>
      {todo.subTasks.map((subtask) => (
        <div key={subtask.id} className='flex items-center justify-between pb-2 pr-1'>
          <div className='flex items-center'>
            <input
              className='ml-1 h-3 w-3 cursor-pointer rounded-lg border-2 border-slate-300 bg-slate-100 outline-none !ring-green-600 ring-offset-2 transition-all checked:text-green-600 hover:bg-slate-200 checked:hover:text-green-700 focus:ring dark:border-slate-500 dark:bg-slate-600 dark:ring-offset-slate-900 dark:checked:border-green-600 dark:checked:bg-green-600 dark:hover:bg-slate-700 dark:checked:hover:border-green-700 dark:checked:hover:bg-green-700 md:h-5 md:w-5'
              type='checkbox'
              checked={subtask.done}
              onChange={() => {
                subtask.done = !subtask.done;
                editTodo(todo);
              }}
            />
            <span className='pl-3 dark:text-white'>{subtask.title}</span>
          </div>
          <div className='flex items-center'>
            <button
              type='button'
              className='h-8 w-8 rounded-md bg-red-500 pl-1 text-white hover:bg-red-600 '
              onClick={() => {
                deleteSubtask({ id: todo.id, subtaskId: subtask.id });
              }}
            >
              <Close />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Subtasks;
