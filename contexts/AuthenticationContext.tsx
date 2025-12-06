import React, { createContext, ReactNode, useState } from "react";

export interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

export const AuthenticationContext = createContext<AuthContextValue>({
  token: null,
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

const AuthenticationContextProvider = ({ children }: ProviderProps) => {
  const [authenticationToken, setAuthenticationToken] = useState<string | null>(
    null
  );
  const authenticate = (token: string) => {
    setAuthenticationToken(token);
  };

  const logout = () => {
    setAuthenticationToken(null);
  };

  const authenticationValues: AuthContextValue = {
    token: authenticationToken,
    isAuthenticated: !!authenticationToken,
    authenticate,
    logout,
  };

  return (
    <AuthenticationContext.Provider value={authenticationValues}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
