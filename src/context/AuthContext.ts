import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
