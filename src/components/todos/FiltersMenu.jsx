import { useFilter } from "../../context/Filter";
import { useViewMode } from "../../context/ViewMode";
import { Grid, List } from "../../icons";

const FiltersMenu = () => {
  const { filters, dispatchFilters } = useFilter();

  const { viewMode, setViewMode } = useViewMode();

  return (
    <div className='flex flex-col dark:text-white'>
      <div className='flex items-center'>
        <label>By Priority:</label>
        <select
          className='mt-1 ml-1 rounded border dark:bg-slate-800'
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
        <div className='ml-2 flex items-center rounded'>
          <div className='mr-1'>View Mode:</div>
          <div className='rounded-lg bg-white py-1 dark:bg-slate-800'>
            <button
              className={`${
                viewMode === "list" ? "bg-indigo-500 text-white" : "bg-white hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-600"
              } ml-1 w-full select-none space-x-2 rounded-md py-1 px-1 text-lg font-semibold leading-none transition-all focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white sm:w-auto`}
              onClick={() => {
                setViewMode("list");
              }}
            >
              <List className='h-8 w-8' />
            </button>
            <button
              className={`${
                viewMode === "grid" ? "bg-indigo-500 text-white" : "bg-white hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-600"
              } ml-1 w-full select-none space-x-2 rounded-md py-1 px-1 text-lg font-semibold leading-none transition-all focus-visible:ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white sm:w-auto`}
              onClick={() => {
                setViewMode("grid");
              }}
            >
              <Grid className='h-8 w-8' />
            </button>
          </div>
        </div>
      </div>

      <div className='mt-2 flex items-center rounded-lg py-1 transition-all'>
        <label className='mr-1'>By Title:</label>
        <input
          type='text'
          className='mt-1 flex w-[485px] rounded border px-2 dark:bg-slate-800'
          placeholder='Search by title'
          value={filters.title}
          onChange={(e) => dispatchFilters({ type: "SET_TITLE_FILTER", payload: e.target.value })}
        />
        <div>
          <button
            className='ml-3 rounded-lg bg-orange-500 px-2 py-2 active:scale-95'
            onClick={() => {
              dispatchFilters({
                type: "SET_PRIORITY_FILTER",
                payload: "all",
              });
              dispatchFilters({
                type: "SET_DONE_FILTER",
                payload: null,
              });
              dispatchFilters({
                type: "SET_TITLE_FILTER",
                payload: "",
              });
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersMenu;
