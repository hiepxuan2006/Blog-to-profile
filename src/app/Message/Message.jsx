import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { DataContext } from "~/Context/AppContext"
import { InputSearch } from "~/components/Search/InputSearch"
import { DocTitle } from "~/helper/DocTitle"
import { toastAlert } from "~/helper/toast"
import useDebounce from "~/hook/useDebounce"
import { getAccessToken } from "~/services/AuthService"
import { searchAccount } from "~/services/api/accountService"
import { createNewChat } from "~/services/api/messageService"
import { addNotifications, getAccounts, getChats } from "~/slices/accountSlice"
import { ModalCreateGroup } from "./ModalCreateGroup"
import moment from "moment"
import { differenceInDays } from "date-fns"
const avatar = require("~/assets/social1.png")
export const Message = ({ children, page }) => {
  const [onlineUsers, setOnlineUsers] = useState([])
  const { user } = useSelector((state) => state.auth)
  const { socket, windowWidth, theme, currenRoom } = useContext(DataContext)
  const { accounts, chatRooms, newMessages } = useSelector(
    (state) => state.account
  )
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [dataSearch, setDataSearch] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [memberGroup, setMemberGroup] = useState([])
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

  const access_token = getAccessToken()
  const navigate = useNavigate()

  const handleShow = () => setShow(true)

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  // Sử dụng trong component của bạn
  useEffect(() => {
    scrollToTop()
  }, [])

  useEffect(() => {
    dispatch(getAccounts())
  }, [dispatch])

  useEffect(() => {
    dispatch(getChats({ id: user._id }))
  }, [dispatch])

  useEffect(() => {
    socket.emit("new-user-add", user._id)
    socket.on("get-users", (users) => {
      setOnlineUsers(users)
    })
  }, [user._id])

  // const checkOnlineStatus = (account) => {
  //   // const chatMember = chat.members.find((member) => member !== user._id);
  //   const online = onlineUsers.find((user) => user.userId === account._id)
  //   return online ? true : false
  // }

  const deBounce = useDebounce(value)

  const _searchAccount = async () => {
    setLoading(true)
    const { data, success, message } = await searchAccount({ q: deBounce })
    setLoading(false)
    if (!success) toastAlert("error", message)
    setShowResult(true)
    setDataSearch(data.accounts)
  }

  socket.off("notifications").on("notifications", (room) => {
    console.log(room)
    if (currenRoom !== room) dispatch(addNotifications(room))
  })
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
  const handleNewMessage = async (id) => {
    const members = [user._id, id]
    const { data, success, message } = await createNewChat({ members })
    if (!success) throw new Error(message)
    setShowResult(false)
    navigate(`/message/direct/${data._id}`)
  }

  const formatTime = (timeString) => {
    const now = new Date()
    const time = new Date(timeString)

    const daysDifference = differenceInDays(now, time)
    let formattedTime
    if (daysDifference >= 1) {
      formattedTime = moment(time).format("DD/MM/YYYY")
    } else {
      formattedTime = moment(timeString).format("LT")
    }
    return formattedTime
  }

  return (
    <div className="Message">
      <DocTitle title={"Trò chuyện"} />
      <div className="row m-0">
        <nav
          className={`col  MessageNav  ${
            windowWidth < 768 && page === "box-mess"
              ? "d-none"
              : windowWidth < 768 && page === "home-mess"
              ? "col-12"
              : "col-5"
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
            <div className="add-room-chat" onClick={handleShow}>
              <i class="fa-solid fa-users-viewfinder"></i>
              <p className="mockup">Tạo nhóm</p>
            </div>
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
                      <li
                        className="item-search"
                        onClick={() => handleNewMessage(item._id)}
                      >
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
            {/* {accounts.length &&
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
                      <div className={`Info`}>
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
              })} */}
            {chatRooms.length &&
              chatRooms.map((chatRoom, key) => {
                console.log(chatRoom)
                if (chatRoom.members.length === 2) {
                  const receiver = chatRoom.members.filter(
                    (item) => item._id !== user._id
                  )[0]
                  return (
                    <li className="" key={key}>
                      <NavLink
                        to={`/message/direct/${chatRoom._id}`}
                        className="ItemChat"
                      >
                        <div className="Avatar">
                          {receiver.is_online && <div className="Online"></div>}
                          <img src={receiver.avatar || avatar} alt="" />
                        </div>
                        <div className={`Info`}>
                          <p>{receiver.name}</p>
                          <div className="last-message">
                            {chatRoom.last_member &&
                            chatRoom.last_member._id === user._id ? (
                              "Bạn:"
                            ) : (
                              <span>
                                {chatRoom.last_member &&
                                  chatRoom.last_member.name}
                                :
                              </span>
                            )}
                            <span>
                              {chatRoom.last_message &&
                                chatRoom.last_message.content}
                            </span>
                          </div>
                        </div>
                        <div className="last_time_message">
                          <p>
                            {formatTime(
                              chatRoom.last_message &&
                                chatRoom.last_message.createdAt
                            )}
                          </p>
                        </div>
                      </NavLink>
                    </li>
                  )
                } else {
                  return (
                    <li className="" key={key}>
                      <NavLink
                        to={`/message/direct/${chatRoom._id}`}
                        className="ItemChat"
                      >
                        <div className="Avatar">
                          <img src={chatRoom.image || avatar} alt="" />
                          <div className="quantity-group">
                            {chatRoom.members.length}
                          </div>
                        </div>
                        <div className={`Info`}>
                          <p>{chatRoom.name}</p>
                          <div className="last-message">
                            {chatRoom.last_message &&
                            chatRoom.last_member._id === user._id ? (
                              "Bạn:"
                            ) : (
                              <span>
                                {chatRoom.last_member &&
                                  chatRoom.last_member.name}
                                :
                              </span>
                            )}
                            <span>
                              {chatRoom.last_message &&
                                chatRoom.last_message.content}
                            </span>
                          </div>
                        </div>
                        <div className="last_time_message">
                          <p>
                            {formatTime(
                              chatRoom.last_message &&
                                chatRoom.last_message.createdAt
                            )}
                          </p>
                        </div>
                      </NavLink>
                    </li>
                  )
                }
              })}
          </ul>
        </nav>
        <div
          className={`col p-0 message-home__content  ${
            windowWidth < 768 && page === "box-mess"
              ? "col-12"
              : windowWidth < 768 && page === "home-mess"
              ? "d-none"
              : ""
          }`}
        >
          {children}
        </div>
      </div>
      <ModalCreateGroup
        show={show}
        setShow={setShow}
        handleShow={handleShow}
        memberGroup={memberGroup}
        setMemberGroup={setMemberGroup}
        accounts={accounts}
      />
    </div>
  )
}
