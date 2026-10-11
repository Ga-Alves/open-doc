import { myAccountOptions } from "@/api-client/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useQuery({
    ...myAccountOptions(),
    retry: false,
  });

  const isAuthenticated = !!data;
  const isAdmin = data?.role === "ADMIN";

  return (
    <AuthContext.Provider value={{ isLoading, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
