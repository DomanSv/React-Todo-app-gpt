import { createContext, useContext, useReducer } from "react";
import { useTodos } from "../hooks";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const { todos, tasksIsLoading, tasksIsFetching } = useTodos();

  const filtersReducer = (state, action) => {
    switch (action.type) {
      case "SET_PRIORITY_FILTER":
        return { ...state, priority: action.payload };
      case "SET_DONE_FILTER":
        return { ...state, done: action.payload };
      case "SET_TITLE_FILTER":
        return { ...state, title: action.payload };
      default:
        return state;
    }
  };

  const [filters, dispatchFilters] = useReducer(filtersReducer, {
    priority: "all",
    done: null,
    title: "",
  });

  const filtersArray = [
    (todo) => filters.priority === "all" || todo.priority === filters.priority,
    (todo) => filters.done === null || todo.done === filters.done,
    (todo) => !filters.title || todo.title.toLowerCase().includes(filters.title.toLowerCase()),
  ];

  let filteredTodos;

  if(!tasksIsLoading){
    filteredTodos = filtersArray.reduce((prev, curr) => prev.filter(curr), todos.data);
  }

  return (
    <FilterContext.Provider
      value={{
        filteredTodos,
        todos,
        filters,
        dispatchFilters,
        tasksIsLoading,
        tasksIsFetching,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (typeof context === "undefined") {
    throw new Error("useFilter should be used inside FilterProvider!");
  }
  return context;
}
