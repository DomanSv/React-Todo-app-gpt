import React, { useRef, useState } from "react";
import Priority from "./Priority";
import SubtaskDropdown from "./SubtaskDropdown";
import { Close, CurvedArrow, Edit, Filter, Loading } from "../../icons";
import { useDeleteTodo, useEditTodo } from "../../hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useFilter } from "../../context/Filter";

const Todos = () => {
  const queryClient = useQueryClient();
  const deletingTodoRef = useRef();

  const { filteredTodos, todos, filters, dispatchFilters, tasksIsLoading, tasksIsFetching } = useFilter();

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFilters = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

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

  if (tasksIsLoading) {
    return (
      <div className='mt-4 flex justify-center'>
        <Loading className='h-10 w-10 animate-spin font-extrabold text-indigo-600 dark:text-white' />
      </div>
    );
  }

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
        tasksIsFetching ? "pointer-events-none opacity-50" : ""
      } isolate mx-auto mb-4 h-full w-full max-w-4xl place-items-center space-y-7 font-sans text-xl transition-all`}
    >
      <div className='flex'>
        <button
          tabIndex={-1}
          className='mr-2 h-[53px] w-full select-none space-x-2 rounded-md border-2 border-indigo-500 bg-white bg-opacity-60 py-4 px-4 text-lg font-semibold leading-none transition-all hover:bg-indigo-200 hover:bg-opacity-50 focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-500 dark:bg-opacity-30 dark:text-white dark:hover:bg-indigo-700 dark:hover:bg-opacity-50 sm:w-auto'
          onClick={toggleFilters}
        >
          <Filter className='mr-1 inline-flex h-5 w-5' />
          Filters
        </button>

        {isExpanded && (
          <div className='flex items-center dark:text-white'>
            <label className='mx-1'>By Priority:</label>
            <select
              className='mt-1 rounded border dark:bg-slate-800'
              value={filters.priority}
              onChange={(e) =>
                dispatchFilters({
                  type: "SET_PRIORITY_FILTER",
                  payload: e.target.value,
                })
              }
            >
              <option value='all'>All</option>
              <option value='low'>😎🤙Low</option>
              <option value='mid'>😑👍Mid</option>
              <option value='high'>😵‍💫⚠️High</option>
            </select>

            <label className='mx-2'>By Status:</label>
            <select
              className='mt-1 rounded border dark:bg-slate-800'
              value={filters.done !== null ? filters.done.toString() : "null"}
              onChange={(e) =>
                dispatchFilters({
                  type: "SET_DONE_FILTER",
                  payload: e.target.value === "null" ? null : e.target.value === "true",
                })
              }
            >
              <option value='null'>All</option>
              <option value='true'>✅Complete</option>
              <option value='false'>❌Incomplete</option>
            </select>
            <label className='mx-2'>By Title:</label>
            <input
              type='text'
              className='p2-1 mt-1 rounded border px-2 dark:bg-slate-800'
              placeholder='Search by title'
              value={filters.title}
              onChange={(e) => dispatchFilters({ type: "SET_TITLE_FILTER", payload: e.target.value })}
            />
          </div>
        )}
      </div>
      {filteredTodos.length === 0 && <div className='text-center font-mono dark:text-white'>No matching data</div>}
      {filteredTodos.map((todo) => (
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
              <Link to={`/edit/${todo.id}`}>
                <button
                  tabIndex={-1}
                  type='button'
                  className='ml-2 h-10 rounded-md bg-orange-500 pl-2 pr-3 text-lg text-white hover:bg-orange-600 active:scale-95'
                >
                  <div className='flex'>
                    <Edit className='h-7 w-7 pr-1' /> Edit
                  </div>
                </button>
              </Link>
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
          {todo.subTasks.length > 0 && <SubtaskDropdown todo={todo} />}
        </div>
      ))}
    </div>
  );
};

export default Todos;
