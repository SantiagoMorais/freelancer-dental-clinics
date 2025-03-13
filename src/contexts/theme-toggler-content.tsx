"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface IThemeTogglerContext {
  isThemeDark: boolean;
  handleThemeToggler: () => void;
}

export const ThemeTogglerContext = createContext<IThemeTogglerContext>({
  isThemeDark: false,
  handleThemeToggler: () => {},
});

export const ThemeTogglerProvider = ({ children }: React.PropsWithChildren) => {
  const [isThemeDark, setIsThemeDark] = useState<boolean>(false);

  useEffect(() => {
    const handleSetTheme = () => {
      const storedTheme = localStorage.getItem("local-theme");
      return storedTheme
        ? setIsThemeDark(JSON.parse(storedTheme))
        : setIsThemeDark(false);
    };

    handleSetTheme();
  }, []);

  useEffect(() => {
    localStorage.setItem("local-theme", isThemeDark ? "true" : "false");
    document.body.classList.toggle("dark", isThemeDark);
  }, [isThemeDark]);

  const handleThemeToggler = () => {
    setIsThemeDark((prevValue) => !prevValue);
  };

  return (
    <ThemeTogglerContext.Provider value={{ isThemeDark, handleThemeToggler }}>
      {children}
    </ThemeTogglerContext.Provider>
  );
};

export const useThemeToggler = () => {
  const context = useContext(ThemeTogglerContext);
  if (!context)
    throw new Error("The context must be wrapped by a ThemeTogglerProvider");
  return context;
};
