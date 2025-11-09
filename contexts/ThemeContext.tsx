import { createThemedStyles } from "@/constants/styles";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  styles: ReturnType<typeof createThemedStyles>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const styles = createThemedStyles(isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, styles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
