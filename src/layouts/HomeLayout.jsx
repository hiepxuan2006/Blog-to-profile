import React, { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { DataContext } from "~/Context/AppContext"
import { Search } from "~/components/Search/Search"
import { Toggle } from "~/components/tonggle/Tonggle"
import { LogoutAccount } from "~/slices/authSlice"
const avatar = require("~/assets/social1.png")
export const HomeLayout = ({ children }) => {
  const { socket, windowWidth, theme } = useContext(DataContext)
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
    socket.emit("user-off", user._id)
    dispatch(LogoutAccount())
  }
  return (
    <div className="HomeLayout">
      <div className="">
        <div
          className={`row m-0  ${
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
                class={`fa-solid fa-compact-disc ${
                  isSearch ? "font-size-2" : ""
                }`}
              ></i>
            </div>
            <ul className="NavLink">
              <li>
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
              </li>
              <li>
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
              </li>
              <li>
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
              </li>
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
            {/* <Search isSearch={isSearch} /> */}
            <div ref={wrapperRef} className="action-more ItemNav mt-5">
              <ul
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
              </ul>
              <ul
                className={`list-action ${
                  !more ? "hidden" : "hideOn"
                } ${theme}`}
              >
                <li
                  onClick={() => {
                    setMore(false)
                    setSwitchTheme(true)
                  }}
                >
                  <i class="fa-regular fa-sun"></i>
                  <p>Chuyển chế độ</p>
                </li>
                <li onClick={handleLogout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className=""
                  >
                    <path d="M10 9.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7zm6-3c-1.787 0-3.46.474-4.911 1.295l.228.2 1.396 1.221c1.004-.456 2.114-.716 3.287-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.283-.26-3.288-.715l-1.396 1.221-.228.2c1.452.82 3.125 1.294 4.912 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z" />
                  </svg>
                  <p>Đăng xuất</p>
                </li>
              </ul>
              <i
                class="fa-solid icon fa-bars"
                onClick={() => setMore(!more)}
              ></i>
              {isSearch ? (
                ""
              ) : (
                <p className={`${windowWidth < 1200 ? "d-none" : ""}`}>
                  Xem thêm
                </p>
              )}
            </div>
          </nav>
          <main className="col  col-10 home-content">{children}</main>
        </div>
      </div>
    </div>
  )
}
