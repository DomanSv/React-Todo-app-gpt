import { createContext, useContext, useEffect } from "react";
import { useLocalStorage, useMedia } from "../hooks";

export const ThemeContext = createContext();
const htmlElement = document.documentElement;

export function ThemeProvider({ children }) {
  const [theme, setTheme, resetTheme] = useLocalStorage("theme", "system");
  const darkQuery = useMedia("(prefers-color-scheme: dark");

  useEffect(() => {
    if (theme === "dark") {
      return htmlElement.classList.add("dark");
    }
    if (theme === "light") {
      return htmlElement.classList.remove("dark");
    }
    if (darkQuery) {
      return htmlElement.classList.add("dark");
    }
    return htmlElement.classList.remove("dark");
  }, [theme, darkQuery]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (typeof context === "undefined") {
    throw new Error("useTheme should be used inside ThemeProvider!");
  }
  return context;
}
