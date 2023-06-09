/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { DataContext } from "~/Context/AppContext"
import { Loading } from "~/components/loading/Loading"
import { Toggle } from "~/components/tonggle/Tonggle"
import { LogoutAccount } from "~/slices/authSlice"
const avatar = require("~/assets/social1.png")
export const HomeLayout = ({ children }) => {
  const { windowWidth, theme, socket, loading } = useContext(DataContext)
  const { user } = useSelector((state) => state.auth)
  const [isSearch, setIsSearch] = useState(false)
  const [more, setMore] = useState(false)
  const [switchTheme, setSwitchTheme] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    socket.emit("new-user-add", user._id)
  }, [user._id])

  const handleClick = (e) => {
    setIsSearch(!isSearch)
  }

  const wrapperRef = useRef(null)
  const searchRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setMore(false)
        setSwitchTheme(false)
      }
    }
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside) // Hủy đăng ký sự kiện khi component unmount
    }
  }, [])
  useEffect(() => {
    const handleClickOutsideSearch = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearch(false)
      }
    }
    document.addEventListener("click", handleClickOutsideSearch)

    return () => {
      document.removeEventListener("click", handleClickOutsideSearch) // Hủy đăng ký sự kiện khi component unmount
    }
  }, [])
  const handleLogout = () => {
    socket.emit("client-send-logout", user._id)
    dispatch(LogoutAccount())
  }
  return (
    <div className="HomeLayout">
      <div className="d-flex ">
        <div
          className={`row m-0 layout-content w-100 flex-nowrap p-0 ${
            isSearch || windowWidth < 1200
              ? "justify-content-between"
              : "justify-content-end"
          }`}
        >
          <nav
            ref={searchRef}
            className={`col ${
              isSearch || windowWidth < 1200 ? "col-1 w-80" : "col-2"
            } Nav`}
          >
            <div className="Logo">
              <i
                class={`fa-solid fa-compact-disc h-100 w-100${
                  isSearch ? "font-size-1" : ""
                }`}
              ></i>
            </div>
            <ul className="NavLink">
              {/* <li>
                <NavLink to={"/home"} className="ItemNav">
                  <div className="">
                    <i className="icon fa-solid fa-house"></i>
                  </div>
                  {!isSearch ? (
                    <p className={`${windowWidth < 1200 ? "d-none" : ""}`}>
                      Trang chủ
                    </p>
                  ) : (
                    ""
                  )}
                </NavLink>
              </li> */}
              <li>
                <a target="_blank" href="/profile" className="ItemNav">
                  <div className="">
                    <i className="icon fa-solid fa-house"></i>
                  </div>

                  <p className={`${windowWidth < 1200 ? "d-none" : ""}`}>
                    My CV
                  </p>
                </a>
              </li>
              {/* <li>
                <div onClick={handleClick} className="ItemNav">
                  <div className="">
                    <i class="fa-solid icon fa-list"></i>
                  </div>
                  {!isSearch ? (
                    <p className={`${windowWidth < 1200 ? "d-none" : ""}`}>
                      To do
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </li> */}
              <li>
                <NavLink to="/play-game" className="ItemNav">
                  <div className="">
                    <i class="fa-solid icon fa-gamepad"></i>
                  </div>
                  {!isSearch ? (
                    <p className={`${windowWidth < 1200 ? "d-none" : ""}`}>
                      Game
                    </p>
                  ) : (
                    ""
                  )}
                </NavLink>
              </li>
              {/* <li>
                <NavLink to={"/explore"} className="ItemNav">
                  <div className="">
                    <i class="fa-solid icon fa-compass"></i>
                  </div>
                  {!isSearch ? (
                    <p className={`${windowWidth < 1200 ? "d-none" : ""}`}>
                      Danh bạ
                    </p>
                  ) : (
                    ""
                  )}
                </NavLink>
              </li> */}
              <li>
                <NavLink to={"/message"} className="ItemNav">
                  <div className="">
                    <i className="icon fa-brands fa-facebook-messenger"></i>
                  </div>
                  {!isSearch ? (
                    <p className={`${windowWidth < 1200 ? "d-none" : ""}`}>
                      Tin nhắn
                    </p>
                  ) : (
                    ""
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to={`/my-account`} className="ItemNav">
                  <div className="ImageAvatar">
                    <img src={user.avatar || avatar} alt="" />
                  </div>
                  {!isSearch || windowWidth < 1200 ? (
                    <p className={`${windowWidth < 1200 ? "d-none" : ""}`}>
                      Trang cá nhân
                    </p>
                  ) : (
                    ""
                  )}
                </NavLink>
              </li>
            </ul>
            <ul ref={wrapperRef} className="action-more  mt-5">
              {/* <ul
                className={`custom-theme ${
                  !switchTheme ? "hidden" : "hideOnAction"
                } ${theme}`}
              >
                <li className="d-flex align-items-center gap-2 justify-content-between">
                  <i
                    class="fa-solid fa-chevron-left"
                    onClick={() => {
                      setMore(true)
                      setSwitchTheme(false)
                    }}
                  ></i>
                  <p>Chuyển chế độ</p>
                  {theme === "darkTheme" && <i class="fa-regular fa-moon"></i>}
                  {theme === "lightTheme" && <i class="fa-regular fa-sun"></i>}
                </li>
                <li className="d-flex align-items-center gap-2 justify-content-between">
                  {theme === "darkTheme" && <p>Chế độ sáng</p>}
                  {theme === "lightTheme" && <p>Chế độ tối</p>}
                  <Toggle />
                </li>
              </ul> */}
              {/* <i
                class="fa-solid icon fa-bars"
                onClick={() => setMore(!more)}
              ></i>
              {isSearch ? (
                ""
              ) : (
                <p className={`${windowWidth < 1200 ? "d-none" : ""}`}>
                  Xem thêm
                </p>
              )} */}
              <li className="switch-theme d-flex ItemNav">
                {/* <div className="icon-theme">
                  {theme === "darkTheme" && <i class="fa-regular fa-moon"></i>}
                  {theme === "lightTheme" && <i class="fa-regular fa-sun"></i>}
                </div> */}
              </li>
            </ul>
            <div onClick={handleLogout} className="d-flex gap-3 logout ItemNav">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className=""
              >
                <path d="M10 9.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7zm6-3c-1.787 0-3.46.474-4.911 1.295l.228.2 1.396 1.221c1.004-.456 2.114-.716 3.287-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.283-.26-3.288-.715l-1.396 1.221-.228.2c1.452.82 3.125 1.294 4.912 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z" />
              </svg>
              <p className={`${windowWidth < 1200 ? "d-none" : ""}`}>
                Đăng xuất
              </p>
            </div>
          </nav>
          <main className="col  col-10 home-content p-0">
            {loading ? <Loading /> : children}
          </main>
        </div>
      </div>
    </div>
  )
}
