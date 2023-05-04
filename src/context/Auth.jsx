import { createContext, useContext } from "react";
import { useAccount, useLocalStorage } from "../hooks";
import { useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [token, setToken, removeToken] = useLocalStorage("token");
  const { account, isLoading } = useAccount({ enabled: Boolean(token) });

  const logOut = () => {
    removeToken();
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
