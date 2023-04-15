import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { DataContext } from "~/Context/AppContext"
import { Account } from "~/app/Account/Account"
import { BoxMessage } from "~/app/Message/BoxMessage"
import { MessageHome } from "~/app/Message/MessageHome"
import { GomakuHome, HomeRoom } from "~/app/Gomoku/GomakuHome"
import { GomakuOnline, Relax } from "~/app/Gomoku/GomakuOnline"
import { HomeLayout } from "~/layouts/HomeLayout"
import { Game } from "~/app/Game/Game"

const PrivateRoute = ({ isAuthenticated, isLoggedIn }) => {
  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/auth" />}</>
}

export const AuthenticatedRoutes = ({ isAuthenticated, isLoggedIn }) => {
  const { loading, setOnline, socket } = useContext(DataContext)
  const { user } = useSelector((state) => state.auth)

  socket.on("get-users", (users) => {
    setOnline(users)
  })
  useEffect(() => {
    if (isLoggedIn) {
      socket.emit("new-user-add", user._id)
    }
  }, [user._id])

  socket.on("disconnect", (user) => {
    socket.emit("user-off", user._id)
  })
  // if (loading) return <Loading />

  return (
    <Routes>
      <Route
        element={
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            isLoggedIn={isLoggedIn}
          />
        }
      >
        <Route path="/home" element={<HomeLayout></HomeLayout>} exact />
        <Route
          path="/my-account"
          element={
            <HomeLayout>
              <Account />
            </HomeLayout>
          }
          exact
        />
        <Route path="/explore" element={<HomeLayout></HomeLayout>} exact />
        <Route
          path="/play-game/gomaku-online"
          element={
            <HomeLayout>
              <GomakuHome></GomakuHome>
            </HomeLayout>
          }
          exact
        />
        <Route
          path="/play-game"
          element={
            <HomeLayout>
              <Game></Game>
            </HomeLayout>
          }
          exact
        />
        <Route
          path="/play-game/gomaku-online/room/:idRoomNumber"
          element={
            // <HomeLayout>
            <GomakuOnline></GomakuOnline>
            // </HomeLayout>
          }
          exact
        />
        {/* <Route path="/" element={<HomeLayout></HomeLayout>} exact /> */}
        <Route
          path="/message"
          element={
            <HomeLayout>
              <MessageHome />
            </HomeLayout>
          }
          exact
        />
        <Route
          path="/message/direct/:account"
          element={
            <HomeLayout>
              <BoxMessage />
            </HomeLayout>
          }
          exact
        />
        <Route path="/" element={<Navigate to={"/message"} />} />
      </Route>
    </Routes>
  )
}
