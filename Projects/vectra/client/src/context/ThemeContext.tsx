import { createContext, useContext, useEffect, useState } from "react";

type Ctx = { isDark: boolean; toggle: () => void; };
const ThemeCtx = createContext<Ctx>({ isDark: false, toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("vectra_theme") === "dark" ||
      (matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("vectra_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("vectra_theme", "light");
    }
  }, [isDark]);

  return (
    <ThemeCtx.Provider value={{ isDark, toggle: () => setIsDark(v => !v) }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);