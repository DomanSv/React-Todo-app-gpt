import React, { useState } from 'react';
import Subtasks from './SubTasks';

const SubtaskDropdown = ({ subtasks }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='ml-6 mr-6 mb-4 bg-slate-200 dark:bg-slate-900 rounded-lg'>
      <button className='w-full px-4 py-2 rounded-lg p-2 text-white bg-indigo-600 text-sm font-semibold' onClick={toggleDropdown}>
        {isExpanded ? 'Hide Subtasks' : `Show ${subtasks.length} Subtasks`}
      </button>
      {isExpanded && <Subtasks subtasks={subtasks} />}
    </div>
  );
};

export default SubtaskDropdown;