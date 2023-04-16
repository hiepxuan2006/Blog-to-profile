import { useContext } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { DataContext } from "./Context/AppContext"
import { CaroOffline } from "./app/Gomoku/CaroOffline"
import { Profile } from "./app/Profile/Profile"
import { Auth } from "./components/Auth/Auth"
import { AuthenticatedRoutes } from "./components/AuthenticatedRoutes"
import { NotFound } from "./components/NotFound/NotFound"
import { Notify } from "./helper/toast"
function App() {
  const { isLogin } = useContext(DataContext)
  const { isLoggedIn } = useSelector((state) => state.auth)

  const { theme } = useContext(DataContext)
  return (
    <div className={`App ${theme}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/logout" element={<Navigate to="/auth" />} />
          <Route
            path="/*"
            element={
              <AuthenticatedRoutes
                isLoggedIn={isLoggedIn}
                isAuthenticated={isLogin}
              />
            }
          />
          <Route
            path="/play-game/gomaku-ofline"
            element={<CaroOffline></CaroOffline>}
            exact
          />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Notify />
    </div>
  )
}

export default App
