import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthenticatedRoutes } from "./components/AuthenticatedRoutes"
import { Auth } from "./components/Auth/Auth"
import { NotFound } from "./components/NotFound/NotFound"
import { Toggle } from "./components/tonggle/Tonggle"
import { DataContext } from "./Context/AppContext"
import { Notify } from "./helper/toast"
import { Profile } from "./app/Profile/Profile"
import { useSelector } from "react-redux"
import { HomeLayout } from "./layouts/HomeLayout"
import { Relax } from "./app/Gomoku/GomakuOnline"
import { CaroOffline } from "./app/Gomoku/CaroOffline"
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
