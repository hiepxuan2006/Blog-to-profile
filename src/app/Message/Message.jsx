import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { DataContext } from "~/Context/AppContext"
import { InputSearch } from "~/components/Search/InputSearch"
import { DocTitle } from "~/helper/DocTitle"
import { toastAlert } from "~/helper/toast"
import useDebounce from "~/hook/useDebounce"
import { getAccessToken } from "~/services/AuthService"
import { searchAccount } from "~/services/api/accountService"
import { getAccounts } from "~/slices/accountSlice"
const avatar = require("~/assets/social1.png")
export const Message = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([])
  const { user } = useSelector((state) => state.auth)
  const { socket, windowWidth, theme } = useContext(DataContext)
  const { accounts } = useSelector((state) => state.account)
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [dataSearch, setDataSearch] = useState([])
  const [showResult, setShowResult] = useState(false)
  const dispatch = useDispatch()

  const access_token = getAccessToken()

  useEffect(() => {
    dispatch(getAccounts())
  }, [dispatch])

  useEffect(() => {
    socket.emit("new-user-add", user._id)
    socket.on("get-users", (users) => {
      setOnlineUsers(users)
    })
  }, [user._id])

  const checkOnlineStatus = (account) => {
    // const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === account._id)
    return online ? true : false
  }

  const deBounce = useDebounce(value)

  const _searchAccount = async () => {
    setLoading(true)
    const { data, success, message } = await searchAccount({ q: deBounce })
    setLoading(false)
    if (!success) toastAlert("error", message)
    setShowResult(true)
    setDataSearch(data.accounts)
  }

  useEffect(() => {
    if (deBounce.trim()) {
      _searchAccount()
    }
  }, [deBounce])

  const wrapperRef = useRef(null)
  const refInput = useRef()
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResult(false)
      }
    }
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside) // Hủy đăng ký sự kiện khi component unmount
    }
  }, [])
  return (
    <div className="Message">
      <DocTitle title={"Trò chuyện"} />
      <div className="row m-0">
        <nav
          className={`col  MessageNav  ${
            windowWidth > 480 && windowWidth < 768 ? "col-2" : "col-4"
          }`}
        >
          <div className="MyAccount">
            <Link to="/home" className="h-100 d-flex align-items-center">
              <i class="fa-solid hide-on__mobile d-none fa-chevron-left"></i>
            </Link>
            <div className="d-flex align-items-center gap-2">
              <p>{user.name}</p>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <i className="fa-regular fa-pen-to-square"></i>
          </div>
          <div ref={wrapperRef} className={`search ${theme}`}>
            <InputSearch
              value={value}
              refInput={refInput}
              setLoading={setLoading}
              setValue={setValue}
              loading={loading}
              isFocused={isFocused}
              setShowResult={setShowResult}
              setDataSearch={setDataSearch}
              dataSearch={dataSearch}
              setIsFocused={setIsFocused}
              theme={theme}
            />
            <div
              className={`search-result ${theme} ${
                !showResult ? "d-none" : ""
              }`}
            >
              <ul>
                {dataSearch.length === 0 && <li>Không có kết quả ...</li>}
                {dataSearch.length > 0 &&
                  dataSearch.map((item, key) => {
                    return (
                      <li className="item-search">
                        <div className="avatar">
                          <img src={item.avatar || avatar} alt="" />
                        </div>
                        <p>{item.name}</p>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
          <ul className="ListChat">
            {accounts.length &&
              accounts.map((account, key) => {
                return (
                  <li key={key} className="">
                    <NavLink
                      to={`/message/direct/${account._id}`}
                      className="ItemChat"
                    >
                      <div className="Avatar">
                        {checkOnlineStatus(account) && (
                          <div className="Online"></div>
                        )}
                        <img src={account.avatar || avatar} alt="" />
                      </div>
                      <div
                        className={`Info ${
                          windowWidth > 480 && windowWidth < 768 ? "d-none" : ""
                        }`}
                      >
                        <p>{account.name}</p>
                        {checkOnlineStatus(account) ? (
                          <span>Đang hoạt động</span>
                        ) : (
                          <span>Offline</span>
                        )}
                      </div>
                    </NavLink>
                  </li>
                )
              })}
          </ul>
        </nav>
        <div className="col col-8 p-0 message-home__content">{children}</div>
      </div>
    </div>
  )
}
