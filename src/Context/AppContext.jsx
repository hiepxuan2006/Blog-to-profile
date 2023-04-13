import { createContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authorizationRequest } from "~/slices/authSlice"
import { io } from "socket.io-client"
export const socket = io("ws://localhost:5005", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
})
export const DataContext = createContext()
export const AppContext = ({ children }) => {
  const [theme, setTheme] = useState("darkTheme")
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const [onLine, setOnline] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

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
    setLoading(true)
    setTimeout(async () => {
      await dispatch(authorizationRequest())
    }, 0)
    setLoading(false)
  }, [])
  console.log("ds_online", onLine)
  const value = {
    socket,
    theme,
    onLine,
    setOnline,
    toggleTheme,
    isLogin,
    setIsLogin,
    loading,
    setLoading,
    windowWidth,
  }
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
