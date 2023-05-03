import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "../hooks";
import { useQueryClient } from "@tanstack/react-query";
import { getStoredToken } from "../utils/helperfuncs";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(null);
  const { account, isLoading } = useAccount({ enabled: Boolean(token) });

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
