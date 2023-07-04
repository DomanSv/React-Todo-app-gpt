import React, { useState } from "react";
import Priority from "./Priority";
import SubtaskDropdown from "./SubtaskDropdown";
import { Close, Edit } from "../../icons";

const Todos = ({ todos }) => {
  const [checkedTodos, setCheckedTodos] = useState([]);

  const handleCheckboxChange = (todoId) => {
    if (checkedTodos.includes(todoId)) {
      setCheckedTodos(checkedTodos.filter((id) => id !== todoId));
    } else {
      setCheckedTodos([...checkedTodos, todoId]);
    }
  };

  if (todos.data.length === 0) {
    return (
      <div className='relative isolate mx-auto mt-6 grid h-full w-full max-w-4xl place-items-center space-y-4 pb-5 pt-4 font-mono text-xl transition-all dark:text-white'>
        Looks like there are no tasks! Chilling time!😎
      </div>
    );
  }

  return (
    <div className='isolate m-4 mx-auto h-full w-full max-w-4xl place-items-center space-y-7 pt-4 font-sans text-xl transition-all'>
      {todos.data.map((todo) => (
        <div
          className={`isolate mx-auto h-full w-full max-w-4xl rounded-lg border-2 border-slate-300 bg-white transition-all dark:border-slate-500 dark:bg-slate-800 dark:text-white ${
            checkedTodos.includes(todo.id) ? "border-green-600 dark:border-green-500" : ""
          }`}
          key={todo.id}
        >
          <div className='relative p-4 flex items-center justify-between'>
            <div className='flex items-center'>
              <Priority priority={todo.priority} />
              <input
                className='h-6 w-6 cursor-pointer rounded-lg border-2 border-slate-300 bg-slate-100 outline-none !ring-green-600 ring-offset-2 transition-all checked:text-green-600 hover:bg-slate-200 checked:hover:text-green-700 focus:ring dark:border-slate-500 dark:bg-slate-600 dark:ring-offset-slate-900 dark:checked:border-green-600 dark:checked:bg-green-600 dark:hover:bg-slate-700 dark:checked:hover:border-green-700 dark:checked:hover:bg-green-700 md:h-8 md:w-8'
                type='checkbox'
                checked={checkedTodos.includes(todo.id)}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              <p
                className={`inline-flex pt-2 pl-4 font-bold ${
                  checkedTodos.includes(todo.id) ? "text-green-600 line-through dark:text-green-500" : ""
                }`}
              >
                {todo.title}
              </p>
            </div>
            <div className='flex items-center'>
              <button type='button' className='ml-2 h-10 rounded-md bg-orange-500 hover:bg-orange-600 pl-2 pr-3 text-lg text-white'>
                <div className='flex'>
                <Edit className='h-7 w-7 pr-1'/> Edit
                </div>
              </button>
              <button type='button' className='ml-2 h-10 rounded-md bg-red-500 hover:bg-red-600 pl-3 pr-3 text-lg text-white'>
                <Close />
              </button>
            </div>
          </div>
          {todo.description && <p className='pl-12 pb-4'>{todo.description}</p> }  
          {todo.subTasks.length > 0 && <SubtaskDropdown subtasks={todo.subTasks} />}
        </div>
      ))}
    </div>
  );
};

export default Todos;