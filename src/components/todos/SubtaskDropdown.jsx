import React, { useState } from "react";
import Subtasks from "./SubTasks";

const SubtaskDropdown = ({ subtasks }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='ml-6 mr-6 mb-4 rounded-lg bg-slate-200 dark:bg-slate-900'>
      <button className='w-full rounded-lg bg-indigo-600 p-2 px-4 py-2 text-sm font-semibold text-white' onClick={toggleDropdown}>
        {isExpanded ? "Hide Subtasks" : `Show ${subtasks.length} Subtasks`}
      </button>
      {isExpanded && <Subtasks subtasks={subtasks} />}
    </div>
  );
};

export default SubtaskDropdown;
