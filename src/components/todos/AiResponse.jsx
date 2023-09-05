import { useState } from "react";
import { Robot } from "../../icons";

const AiResponse = ({ response, gptIsLoading }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleAiResponse = () => {
      setIsExpanded(prevIsExpanded => !prevIsExpanded);
    };

    if(gptIsLoading) {
        return (
            <div className='mt-4 flex justify-center'>
      <Robot className='my-2 h-8 w-8 animate-bounce' />
    </div>);}

    if(!response) {
        return;
    }
  return (
    <div className='pl-6 pb-2'>
    <button className='rounded-lg bg-blue-500 p-2 px-4 py-2 text-sm font-semibold text-white active:scale-95' onClick={toggleAiResponse}>
    {isExpanded ? "Скрий съвети" : `Покажи съвети`}
  </button>
    {isExpanded && 
      <p className='mb-2 rounded-lg border-2 border-sky-500 bg-indigo-100 pl-4 mr-6 pt-1 pb-2 pr-4 transition-all dark:bg-slate-700'>
        AI съвети: {response}
      </p>}
      </div>
  );
};

export default AiResponse;
