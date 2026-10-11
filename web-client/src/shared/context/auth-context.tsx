import { createContext } from "react";

export type AuthContextType = {
  isLoading: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
