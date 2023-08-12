import { createContext, useContext, useState } from "react";

export const ViewModeContext = createContext();

export function ViewModeProvider({ children }) {

  const [isListView, setIsListView] = useState(true);

  return (
    <ViewModeContext.Provider
      value={{
        isListView,
        setIsListView,
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
