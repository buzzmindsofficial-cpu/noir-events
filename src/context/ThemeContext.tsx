"use client";

import React, { createContext, useContext, useSyncExternalStore, useCallback, useEffect } from "react";
import { useIsMounted } from "@/lib/useIsMounted";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeToDOM(newTheme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (newTheme === "light") {
    root.classList.remove("dark");
    root.classList.add("light");
    root.setAttribute("data-theme", "light");
  } else {
    root.classList.remove("light");
    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");
  }
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("noir_theme") as Theme | null;
  if (stored === "light") return "light";
  if (stored === "dark") return "dark";
  return "dark"; // Default to dark-first premium design
}

function getServerSnapshot(): Theme {
  return "dark";
}

let themeListeners: Array<() => void> = [];

function subscribeToTheme(callback: () => void) {
  themeListeners.push(callback);

  const handleStorage = () => callback();
  window.addEventListener("storage", handleStorage);

  let media: MediaQueryList | null = null;
  if (window.matchMedia) {
    media = window.matchMedia("(prefers-color-scheme: light)");
    media.addEventListener("change", handleStorage);
  }

  return () => {
    themeListeners = themeListeners.filter((l) => l !== callback);
    window.removeEventListener("storage", handleStorage);
    if (media) {
      media.removeEventListener("change", handleStorage);
    }
  };
}

function notifyThemeChange() {
  themeListeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mounted = useIsMounted();
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem("noir_theme", newTheme);
    applyThemeToDOM(newTheme);
    notifyThemeChange();
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
