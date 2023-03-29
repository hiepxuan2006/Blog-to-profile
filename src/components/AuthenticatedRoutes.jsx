import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { Dashboard } from "../app/Home/Dashboard"
import { Profile } from "../app/Profile/Profile"

const PrivateRoute = ({ isAuthenticated }) => {
  return <>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</>
}

export const AuthenticatedRoutes = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<Profile />} exact />
      </Route>
    </Routes>
  )
}
