import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import "./theme.css";

export type ThemeMode = "light" | "dark" | "system";
export type AccentColor = "blue" | "violet" | "emerald" | "rose" | "amber";

export interface ThemeContextValue {
  /** The user's selected mode. Can be "system" to follow the OS preference. */
  theme: ThemeMode;
  /** The actual applied mode ("light" or "dark") after resolving "system". */
  resolvedTheme: "light" | "dark";
  /** Updates the selected mode. */
  setTheme: (theme: ThemeMode) => void;
  /** The current accent/brand color preset. */
  accent: AccentColor;
  /** Updates the accent/brand color preset. */
  setAccent: (accent: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial mode. @default "system" */
  defaultTheme?: ThemeMode;
  /** Initial accent color. @default "blue" */
  defaultAccent?: AccentColor;
  /** localStorage key used to persist the user's choice. Set to `false` to disable persistence. */
  storageKey?: string | false;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultAccent = "blue",
  storageKey = "uk-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (storageKey && typeof window !== "undefined") {
      const stored = window.localStorage.getItem(`${storageKey}-mode`);
      if (stored === "light" || stored === "dark" || stored === "system") return stored;
    }
    return defaultTheme;
  });

  const [accent, setAccentState] = useState<AccentColor>(() => {
    if (storageKey && typeof window !== "undefined") {
      const stored = window.localStorage.getItem(`${storageKey}-accent`);
      if (stored) return stored as AccentColor;
    }
    return defaultAccent;
  });

  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(getSystemTheme);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  const setTheme = useCallback(
    (next: ThemeMode) => {
      setThemeState(next);
      if (storageKey) window.localStorage.setItem(`${storageKey}-mode`, next);
    },
    [storageKey],
  );

  const setAccent = useCallback(
    (next: AccentColor) => {
      setAccentState(next);
      if (storageKey) window.localStorage.setItem(`${storageKey}-accent`, next);
    },
    [storageKey],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, accent, setAccent }),
    [theme, resolvedTheme, setTheme, accent, setAccent],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className="uk-theme-root" data-theme={resolvedTheme} data-accent={accent}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return context;
}
