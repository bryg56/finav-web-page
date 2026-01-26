/* eslint-disable react-refresh/only-export-components */
import { loginUsuario } from "@/auth/actions/login.action";
import type { User } from "@/interfaces/user.interface";

import { createContext, useState, type PropsWithChildren } from "react";

type AuthStatus = "checking" | "aunthenticated" | "not-authenticaded";

interface UserContextProps {
  //state
  authStatus: AuthStatus;
  user: User | null;
  // methods

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (email: string, password: string) => {
    const responseData = await loginUsuario({ email, password });

    if (!responseData.ok) {
      setUser(null);
      setAuthStatus("not-authenticaded");
      return false;
    }
    localStorage.setItem("tokenFinav", responseData.token);
    setUser(responseData);
    setAuthStatus("aunthenticated");
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem("tokenFinav");
    setAuthStatus("not-authenticaded");
    setUser(null);
  };

  return (
    <UserContext
      value={{
        authStatus: authStatus,
        user: user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext>
  );
};
