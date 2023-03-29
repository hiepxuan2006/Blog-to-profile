import React, { createContext, useState } from "react"
export const DataContext = createContext()
export const AppContext = ({ children }) => {
  const [theme, setTheme] = useState("darkTheme")
  const toggleTheme = () => {
    setTheme(theme === "darkTheme" ? "lightTheme" : "darkTheme")
  }
  const value = { theme, toggleTheme }
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
