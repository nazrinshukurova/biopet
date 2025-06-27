// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); // <-- vacib
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
