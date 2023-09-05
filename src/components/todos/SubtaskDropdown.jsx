import React, { useState } from "react";
import Subtasks from "./SubTasks";

const SubtaskDropdown = ({ todo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropdown = () => {
    setIsExpanded(prevIsExpanded => !prevIsExpanded);
  };

  return (
    <div className='ml-6 mr-6 mb-2 rounded-lg bg-slate-200 dark:bg-slate-900'>
      <button className='w-full rounded-lg bg-indigo-600 p-2 px-4 py-2 text-sm font-semibold text-white' onClick={toggleDropdown}>
        {isExpanded ? "Скрий подзадачи" : `Покажи ${todo.subTasks.length} подзадачи`}
      </button>
      {isExpanded && <Subtasks todo={todo} />}
    </div>
  );
};

export default SubtaskDropdown;