import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthenticatedRoutes } from "./components/AuthenticatedRoutes"
import { Auth } from "./components/Auth/Auth"
import { NotFound } from "./components/NotFound/NotFound"
import { Toggle } from "./components/tonggle/Tonggle"
import { DataContext } from "./Context/AppContext"
import { Notify } from "./helper/toast"
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const { theme } = useContext(DataContext)
  return (
    <div className={`App ${theme}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth onLogin={handleLogin} />} />
          <Route
            path="/logout"
            element={<Navigate to="/login" />}
            onEnter={handleLogout}
          />
          <Route
            path="/"
            element={<AuthenticatedRoutes isAuthenticated={isAuthenticated} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toggle />
      <Notify />
    </div>
  )
}

export default App
