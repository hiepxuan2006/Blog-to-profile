import { useContext, useEffect, useRef, useState } from "react"
import InputEmoji from "react-input-emoji"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { format } from "timeago.js"
import { DataContext } from "~/Context/AppContext"
import { getAccount } from "~/services/api/accountService"
import { getMessage, sendMessage } from "~/services/api/messageService"
import { Message } from "./Message"
import { Loading } from "~/components/loading/Loading"
import { Spinner } from "reactstrap"
import { Howl } from "howler"
const avatar = require("~/assets/social1.png")
export const BoxMessage = () => {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState("")
  const [chatRoom, setChatRoom] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [receiver, setReceiver] = useState("")
  const { socket } = useContext(DataContext)
  const { user } = useSelector((state) => state.auth)
  const { account } = useParams()
  const scroll = useRef()
  const [receivedMessage, setReceivedMessage] = useState(null)
  const [isFocused, setIsFocused] = useState(false)
  const [typing, setTyping] = useState(false)
  const [loading, setLoading] = useState(false)
  const Sounds = new Howl({
    src: ["/sound/score.wav"],
  })

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  useEffect(() => {
    if (isFocused && newMessage) {
      socket.emit("user-typing-message", {
        senderId: user._id,
        receiverId: account,
        isTyping: true,
      })
    } else {
      socket.emit("user-typing-message", {
        senderId: user._id,
        receiverId: account,
        isTyping: false,
      })
    }
  }, [newMessage, isFocused])

  useEffect(() => {
    socket.emit("users-online", user._id)
    socket.on("users-online", (users) => {
      setOnlineUsers(users)
    })
  }, [account])

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isFocused])

  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true)
      const { data, success, message } = await getMessage({
        members: [user._id, account],
      })
      setLoading(false)
      if (!success) throw new Error(message)
      setMessages(data.message)
      setChatRoom(data.chatRoom)
    }
    fetchMessage()
  }, [account])

  useEffect(() => {
    const fetchMessage = async () => {
      const { data, success, message } = await getAccount({ id: account })
      if (!success) throw new Error(message)
      setReceiver(data)
    }
    fetchMessage()
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
      chatId: chatRoom,
      receiverId: account,
    }
    socket.emit("user-typing-message", {
      senderId: user._id,
      receiverId: account,
      isTyping: false,
    })
    const { data, success, message: mess } = await sendMessage(message)
    if (!success) {
      setLoading(false)
      throw new Error(mess)
    }
    setMessages([...messages, data])

    socket.emit("send-message", message)

    setLoading(false)
    setNewMessage("")
  }

  socket.on("user-typing", (data) => {
    const { receiverId, isTyping } = data
    console.log(receiverId, account)
    if (receiverId === user._id) {
      console.log(isTyping)
      setTyping(isTyping)
    }
  })

  socket.on("recieve-message", (data) => {
    const { chatId } = data
    if (chatId === chatRoom) {
      setReceivedMessage(data)
      Sounds.play()
    }
  })
  useEffect(() => {
    if (receivedMessage) {
      setMessages([...messages, receivedMessage])
    }
  }, [receivedMessage])

  const checkOnlineStatus = (account) => {
    // const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === account._id)
    return online ? true : false
  }

  return (
    <div className="BoxMessage">
      <Message>
        <div className="BoxMessage">
          <div className="Heading">
            <Link
              to={"/message"}
              className="h-100 p-3 d-flex align-items-center"
            >
              <i class="fa-solid hide-on__mobile d-none fa-chevron-left"></i>
            </Link>
            <div className="Info">
              <div className="Image">
                {checkOnlineStatus(receiver) && <div className="OnLine"></div>}
                <img src={receiver.avatar || avatar} alt="" />
              </div>
              <div className="d-flex flex-column justify-content-center">
                <p>{receiver.name}</p>
                {checkOnlineStatus(receiver) ? (
                  <span>Đang hoạt động</span>
                ) : (
                  <span>offline</span>
                )}
              </div>
            </div>
            <div className="Action">
              <i className="fa-solid fa-phone"></i>
              <i className="fa-solid fa-video"></i>
            </div>
          </div>
          <div className="Box-content">
            {loading && <Loading />}
            <div className="BoxBody">
              {messages && messages.length === 0 ? (
                <p>Cùng nhau trò chuyện nào!</p>
              ) : (
                messages &&
                messages.length &&
                messages.map((item, key) => {
                  return (
                    <div
                      className={`item-message ${
                        item.senderId === user._id && "message-own"
                      }`}
                    >
                      <div
                        className={`avatar-item__message ${
                          item.senderId === user._id && "d-none"
                        }`}
                      >
                        <img src={item.avatar || avatar} alt="" />
                      </div>
                      <div
                        key={key}
                        ref={scroll}
                        className={`message ${
                          item.senderId === user._id && "own"
                        }`}
                      >
                        <span>{item.content}</span>
                        <span>{format(item.createdAt)}</span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
            {typing && (
              <div ref={scroll} className="typing">
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
