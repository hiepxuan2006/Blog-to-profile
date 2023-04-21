import { createContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authorizationRequest } from "~/slices/authSlice"
import { io } from "socket.io-client"
import { URL } from "~/helper/url"
import { async } from "react-input-emoji"
export const socket = io(URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
})
export const DataContext = createContext()
export const AppContext = ({ children }) => {
  const [theme, setTheme] = useState("lightTheme")
  const [isLogin, setIsLogin] = useState(false)
  const { user, loading } = useSelector((state) => state.auth)
  const [onLine, setOnline] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [currenRoom, setCurrentRoom] = useState("")
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "darkTheme" ? "lightTheme" : "darkTheme")
  }
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      await dispatch(authorizationRequest())
    })()
    // setTimeout(async () => {

    // }, 0)
  }, [])
  const value = {
    socket,
    theme,
    onLine,
    setOnline,
    toggleTheme,
    isLogin,
    setIsLogin,
    loading,
    windowWidth,
    currenRoom,
    setCurrentRoom,
  }
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
