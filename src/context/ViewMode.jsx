import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks";

export const ViewModeContext = createContext();

export function ViewModeProvider({ children }) {
  const [viewMode, setViewMode] = useLocalStorage("viewMode", "list");

  if (viewMode === null) {
    setViewMode("list");
  }

  return (
    <ViewModeContext.Provider
      value={{
        setViewMode,
        viewMode,
      }}
    >
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (typeof context === "undefined") {
    throw new Error("useViewMode should be used inside ViewModeProvider!");
  }
  return context;
}
