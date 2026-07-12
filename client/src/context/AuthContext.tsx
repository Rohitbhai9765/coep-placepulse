import {
  createContext,
  useContext,
  useState,
} from "react";

import type { User } from "@/types/auth";

interface AuthContextType {

  user: User | null;

  token: string | null;

  login: (
    token: string,
    user: User
  ) => void;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );

  const [user, setUser] =
    useState<User | null>(
      localStorage.getItem("user")
        ? JSON.parse(
            localStorage.getItem("user")!
          )
        : null
    );

  const login = (
    jwt: string,
    user: User
  ) => {

    localStorage.setItem(
      "token",
      jwt
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setToken(jwt);

    setUser(user);

  };

  const logout = () => {

    localStorage.clear();

    setUser(null);

    setToken(null);

  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () =>
  useContext(AuthContext);