import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "../hooks";
import { useQueryClient } from "@tanstack/react-query";
import { getStoredToken } from "../utils/helperfuncs";
import { usePreferedTheme } from "../hooks/theme";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(null);
  const { account, isLoading } = useAccount({ enabled: Boolean(token) });

  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "system");
  const element = document.documentElement;
  const darkQuery = usePreferedTheme();

  function onWindowMatch() {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }
  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

  useEffect(() => {
    const storedToken = getStoredToken();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logOut = () => {
    setToken(null);
    localStorage.removeItem("token");
    queryClient.resetQueries();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        authenticated: Boolean(token),
        account,
        isLoading,
        logOut,
        theme,
        setTheme
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuth should be used inside AuthProvider!");
  }
  return context;
}
