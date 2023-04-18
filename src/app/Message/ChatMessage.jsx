import { differenceInDays } from "date-fns"
import moment from "moment"
import { useContext, useEffect, useRef, useState } from "react"
import InputEmoji from "react-input-emoji"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Spinner } from "reactstrap"
import { DataContext } from "~/Context/AppContext"
import { getRoom } from "~/services/api/accountService"
import { Message } from "./Message"

const avatar = require("~/assets/social1.png")
export const ChatMessage = () => {
  const scroll = useRef()
  const scrollTyping = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState("")
  const [loading, setLoading] = useState(false)
  const [room, setRoom] = useState("")
  const { user } = useSelector((state) => state.auth)
  const { account } = useParams()
  const { socket, setCurrentRoom, currenRoom } = useContext(DataContext)
  const [typing, setTyping] = useState(false)
  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isFocused])

  useEffect(() => {
    scrollTyping.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true)
      const { data, success, message } = await getRoom({
        id: account,
      })
      setLoading(false)
      if (!success) throw new Error(message)
      setRoom(data)
    }
    fetchMessage()
  }, [account])
  useEffect(() => {
    socket.emit("user-join-room", account, currenRoom)
    socket
      .off("server-send-new-message")
      .on("server-send-new-message", (payload) => {
        setMessages(payload)
      })
    setCurrentRoom(account)
  }, [account])

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend(event)
    }
  }

  const formatTime = (timeString) => {
    const now = new Date()
    const time = new Date(timeString)

    const daysDifference = differenceInDays(now, time)
    let formattedTime
    if (daysDifference >= 1) {
      formattedTime = moment(time).format("DD/MM/YYYY")
    } else {
      formattedTime = "hôm nay"
    }
    return formattedTime
  }
  const filterReceiver = (data) => {
    const receiver = data.filter((item) => item._id !== user._id)[0]
    return receiver
  }

  socket
    .off("server-send-new-message")
    .on("server-send-new-message", (payload) => {
      setMessages(payload)
    })

  const handleSend = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!newMessage) {
      setLoading(false)
      return
    }
    const message = {
      senderId: user._id,
      content: newMessage,
      roomId: account,
      chatId: account,
    }
    socket.emit("client-send-typing-message", {
      senderId: user._id,
      roomId: account,
      isTyping: false,
    })
    socket.emit("client-send-new-message", { roomId: account, message })

    setLoading(false)
    setNewMessage("")
  }

  useEffect(() => {
    if (isFocused && newMessage) {
      socket.emit("client-send-typing-message", {
        senderId: user._id,
        roomId: account,
        isTyping: true,
      })
    } else {
      socket.emit("client-send-typing-message", {
        senderId: user._id,
        roomId: account,
        isTyping: false,
      })
    }
  }, [isFocused, newMessage])

  socket
    .off("server-send-user-typing")
    .on("server-send-user-typing", (payload) => {
      const { roomId, senderId, isTyping } = payload

      if (senderId !== user._id) {
        setTyping(isTyping)
      }
    })
  return (
    <div className="BoxMessage">
      <Message page={"box-mess"}>
        <div className="BoxMessage">
          <div className="Heading">
            <Link
              to={"/message"}
              className="h-100 p-3 d-flex align-items-center"
            >
              <i class="fa-solid hide-on__mobile d-none fa-chevron-left"></i>
            </Link>
            {room && room.members.length > 2 && (
              <div className="Info">
                <div className="Image">
                  {<img src={room.image || avatar} alt="" />}
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <p>{room.name}</p>
                </div>
              </div>
            )}
            {room && room.members.length === 2 && (
              <div className="Info">
                <div className="Image">
                  {
                    <img
                      src={filterReceiver(room.members).avatar || avatar}
                      alt=""
                    />
                  }
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <p>{filterReceiver(room.members).name}</p>
                  {filterReceiver(room.members).is_online ? (
                    <span>Đang hoạt động</span>
                  ) : (
                    <span>offline</span>
                  )}
                </div>
              </div>
            )}
            <div className="Action">
              <i className="fa-solid fa-phone"></i>
              <i className="fa-solid fa-video"></i>
            </div>
          </div>
          <div className="Box-content">
            <div className="BoxBody">
              {messages && messages.length === 0 ? (
                <p>Cùng nhau trò chuyện nào!</p>
              ) : (
                messages &&
                messages.length &&
                messages.map((item, key) => {
                  return (
                    <div className="list-mess mt-3" key={key}>
                      <p className="day-mess">{formatTime(item._id)}</p>
                      {item.list.length > 0 &&
                        item.list.map((value, key) => {
                          return (
                            <div
                              key={key}
                              className={`item-message mt-3 ${
                                value.senderId._id === user._id
                                  ? "message-own"
                                  : ""
                              }`}
                            >
                              <div className={`avatar-item__message `}>
                                <img
                                  src={value.senderId.avatar || avatar}
                                  alt=""
                                />
                              </div>
                              <div ref={scroll} className={`message `}>
                                <span>{value.content}</span>
                                {loading && key === messages.length - 1 ? (
                                  <Spinner
                                    className="loading-mess"
                                    animation="border"
                                    role="status"
                                  >
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </Spinner>
                                ) : (
                                  <span>
                                    {moment(value.createdAt).format("LT")}
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  )
                })
              )}
              {/* ) }) )} */}
            </div>
            {typing && (
              <div ref={scrollTyping} className="typing">
                <div className="note"></div>
                <div className="note"></div>
                <div className="note"></div>
                <p></p>
              </div>
            )}
          </div>
          <div className="BoxSender">
            <i className="fa-solid fa-plus"></i>
            <InputEmoji
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
              value={newMessage}
              onChange={handleChange}
              onFocus={handleFocus}
            />
            <button disabled={loading} className="button" onClick={handleSend}>
              {loading ? (
                <Spinner className="load" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Gửi"
              )}
            </button>
          </div>
        </div>
      </Message>
    </div>
  )
}
