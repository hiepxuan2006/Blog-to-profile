import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { DataContext } from "~/Context/AppContext"
import { toastAlert } from "~/helper/toast"

const xChess = require("../../assets/X-chess.png")
const oChess = require("~/assets/O-chess.png")
export const GomakuOnline = () => {
  let [xFlag, setxFlag] = useState(true)
  let [gameFinish, setGameFinish] = useState(false)
  const [members, setMembers] = useState([])
  const [idPlayer, setIdPlayer] = useState("")
  const [player, setPlayer] = useState([])
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [wait, setWait] = useState(false)
  const [viewChat, setViewChat] = useState(true)
  const [valueChat, setValueChat] = useState("")
  const [messages, setMessage] = useState([])
  const [winner, setWinner] = useState("")
  const [showMobile, setShowMobile] = useState(false)
  const messRef = useRef(null)
  let { idRoomNumber } = useParams()
  let x = 16,
    y = 16
  let matrix = new Array(x)
  let checkLine = -1
  const { socket } = useContext(DataContext)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    socket.emit("client-join-room", {
      idRoomNumber: idRoomNumber - 1,
      userName: user.name,
      userId: user._id,
    })
  }, [user._id])

  const getPlayer = (data) => {
    const values = data.filter((item) => item.player === true)
    setPlayer(values)
  }

  useEffect(() => {
    setPlaying(false)
    setReady(false)
    socket.emit("client-reload-ready", idRoomNumber - 1)
    reStartGame()
  }, [player])

  socket.on("clients-get-new-player", (data) => {
    if (data.playerLeave === false) {
      setMembers(data.listPlayer)
      setIdPlayer(data.idPlayer)
    } else {
      getPlayer(data.listPlayer)
      setMembers(data.listPlayer)
      setIdPlayer(data.idPlayer)
    }
  })
  useEffect(() => {
    console.log(player)
  }, [player])

  useEffect(() => {
    player.forEach((element, index) => {
      if (element.userId === user._id) {
        if (index === 0) {
          setGameFinish(false)
          setxFlag(true)
        } else {
          setGameFinish(true)
          setxFlag(false)
        }
      }
    })
  }, [playing])

  const isViewer = members.some(
    (item) => item.userId === user._id && item.player === false
  )

  socket.on("disconnect", (user) => {
    socket.emit("user-leave-room", {
      idRoomNumber: idRoomNumber - 1,
      userName: user.name,
      userId: user._id,
      idPlayer,
    })
  })

  for (let i = 0; i < x; i++) {
    matrix[i] = Array(y).fill(null)
  }
  const OnClickReady = () => {
    const isPlayer = members.some(
      (item) => item.userId === user._id && item.player === true
    )
    if (!isPlayer) {
      toastAlert("warn", "Phòng đã đầy ! không thể sẵn sàng!")
    }
    socket.emit("client-send-ready", {
      userName: user.name,
      userId: user._id,
      idPlayer,
      ready: true,
      idRoomNumber: idRoomNumber - 1,
    })
    setReady(true)
    setWinner("")
  }

  socket.on("server-send-playing", (data) => {
    setPlaying(data.playing)
    reStartGame()
  })

  const checkItemClicked = (i, j) => {
    if (
      matrix[i][j] !== 1 &&
      matrix[i][j] !== 0 &&
      gameFinish === false &&
      wait === false &&
      playing === true
    ) {
      return true
    } else {
      return false
    }
  }

  const checkWin = (c, i, j) => {
    let dem = 0
    let itemp = i,
      jtemp = j
    try {
      //check ngang;
      while (dem < 5) {
        if (matrix[itemp][jtemp] == c) {
          dem++
          jtemp++
        } else {
          break
        }
      }
      if (dem >= 5) {
        checkLine = 0
        return dem
      }
    } catch {}
    try {
      //check dọc;
      dem = 0
      checkLine = -1
      itemp = i
      jtemp = j
      while (dem < 5) {
        if (matrix[itemp][jtemp] == c) {
          dem++
          itemp++
        } else {
          break
        }
      }
      if (dem >= 5) {
        checkLine = 1
        return dem
      }
    } catch {}
    try {
      //check chéo chính
      dem = 0
      checkLine = -1
      itemp = i
      jtemp = j
      while (dem < 5) {
        if (matrix[itemp][jtemp] == c) {
          dem++
          itemp++
          jtemp++
        } else {
          break
        }
      }
      if (dem >= 5) {
        checkLine = 2
        return dem
      }
    } catch {}
    try {
      //check chéo phụ
      dem = 0
      checkLine = -1
      itemp = i
      jtemp = j
      while (dem < 5) {
        if (matrix[itemp][jtemp] == c) {
          dem++
          itemp++
          jtemp--
        } else {
          break
        }
      }
      if (dem >= 5) {
        checkLine = 3
        return dem
      }
    } catch {}
    //kết thúc
    return dem
  }

  const fillColorLineWin = (cas, i, j) => {
    let painNum = 5
    if (cas == 0) {
      while (painNum > 0) {
        const newItem = document.getElementById(`post-${i}-${j}`)
        newItem.style.backgroundColor = "red"
        //duong ngang

        j++
        painNum--
      }
    } else if (cas == 1) {
      //duong doc
      while (painNum > 0) {
        const newItem = document.getElementById(`post-${i}-${j}`)
        newItem.style.backgroundColor = "red"
        i++
        painNum--
      }
    } else if (cas == 2) {
      while (painNum > 0) {
        const newItem = document.getElementById(`post-${i}-${j}`)
        newItem.style.backgroundColor = "red"
        //duong cheo chinh
        i++
        j++
        painNum--
      }
    } else {
      while (painNum > 0) {
        const newItem = document.getElementById(`post-${i}-${j}`)
        newItem.style.backgroundColor = "red"
        //duong cheo phu

        i++
        j--
        painNum--
      }
    }
  }

  const findPlayerWin = () => {
    let playerWin = -1
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        if (matrix[i][j] === 0) {
          if (checkWin(0, i, j) >= 5) {
            fillColorLineWin(checkLine, i, j)
            playerWin = 0
          }
        } else if (matrix[i][j] === 1) {
          if (checkWin(1, i, j) >= 5) {
            fillColorLineWin(checkLine, i, j)
            playerWin = 1
          }
        }
      }
    }
    if (playerWin !== -1) {
      setReady(false)
      setPlaying(false)
      if (playerWin === 1) {
        if (xFlag) {
          socket.emit("client-send-winner", { idRoomNumber: idRoomNumber - 1 })
        }
      }
      if (playerWin === 0) {
        if (xFlag === false) {
          socket.emit("client-send-winner", { idRoomNumber: idRoomNumber - 1 })
        }
      }
      socket.on("server-send-client-win", (data) => {
        setWinner(data.winner.userName)
      })
    }
  }

  const reStartGame = () => {
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        const newItem = document.getElementById(`post-${i}-${j}`)
        newItem.style.backgroundImage = "none"
        newItem.style.backgroundColor = "white"
        matrix[i][j] = null
      }
    }
    matrix.slice(0, x)

    checkLine = -1
    setGameFinish(!gameFinish)
    setxFlag(!true)
  }

  const handleClick = (rowIndex, colIndex) => {
    if (checkItemClicked(rowIndex, colIndex)) {
      if (gameFinish === false) {
        socket.emit("client-send-location-XO", {
          rowIndex,
          colIndex,
          xFlag,
          idRoomNumber: idRoomNumber - 1,
        })
        findPlayerWin()
        setWait(true)
      }
    }
  }

  socket.on("server-send-data-location-all", async (data) => {
    const { rowIndex, colIndex, xFlag: flag, idRoomNumber } = data
    const newItem = document.getElementById(`post-${rowIndex}-${colIndex}`)
    if (flag === true) {
      newItem.style.backgroundImage = `url(${xChess})`

      matrix[rowIndex][colIndex] = 1
    } else {
      newItem.style.backgroundImage = `url(${oChess})`

      matrix[rowIndex][colIndex] = 0
    }
    findPlayerWin()
    setGameFinish(!gameFinish)
    setWait(false)
  })

  const handleUnReady = () => {
    socket.emit("client-reload-ready", idRoomNumber - 1)
    setReady(false)
  }

  const handleSendMessage = () => {
    if (!valueChat) return
    socket.emit("client-send-message-game", {
      idRoomNumber: idRoomNumber - 1,
      message: valueChat,
      userId: user._id,
      userName: user.name,
    })
    // setMessage([
    //   ...messages,
    //   { message: valueChat, userId: user._id, userName: user.name },
    // ])
    setValueChat("")
  }

  socket.on("server-all-message-game", (data) => {
    setMessage(data)
  })

  socket.on("server-send-message-game", (data) => {
    setMessage([...messages, data])
  })
  useEffect(() => {
    messages.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(event)
    }
  }
  console.log("********", showMobile)
  return (
    <div className="Relax">
      <div className="table-chess">
        <div className="d-none hide-mobile bar-mobile">
          <Link
            to={"/play-game/gomaku-online"}
            class="fa-solid fa-chevron-left"
          ></Link>
          <div className="info-chess__action action-room d-none hide-mobile">
            {isViewer ? (
              <button disabled className="btn btn-secondary">
                Xem
              </button>
            ) : ready ? (
              <button
                disabled={playing}
                onClick={handleUnReady}
                className="btn btn-secondary"
              >
                Hủy sẵn sàng
              </button>
            ) : (
              <button className="btn btn-success" onClick={OnClickReady}>
                Sẵn sàng
              </button>
            )}
            <button className="btn btn-warning">Rời phòng</button>
          </div>
          <input
            onChange={(e) => setShowMobile(e.target.checked)}
            type="checkbox"
            name=""
            id="show-room"
            hidden
          />
          <label htmlFor="show-room">
            <i class="fa-regular fa-handshake"></i>
          </label>
        </div>
        <div className="info-chess__member d-none hide-mobile">
          {members.length > 0 &&
            members.map((member, key) => {
              return (
                <Fragment key={key}>
                  {member.player && (
                    <div
                      key={key}
                      className={`member-item ${
                        member.userId === user._id ? "member-me" : ""
                      }`}
                    >
                      <p>Player {key + 1}</p>
                      <p> {member.userName}</p>
                    </div>
                  )}
                </Fragment>
              )
            })}
        </div>

        <div className="chess">
          <div className="hide-mobile">
            {!isViewer && (
              <div className="chess-action">
                {playing && gameFinish && <p>Lượt đối thủ ...</p>}
                {playing && gameFinish === false && <p>Lượt của bạn ...</p>}
                {!playing && ready && player.length === 2 && (
                  <p>Đang chờ đối thủ...</p>
                )}
                {!playing && !ready && player.length === 2 && (
                  <p>Đã tìm thấy đối thủ, hãy sãn sàng...</p>
                )}
                {!playing && !ready && player.length < 2 && (
                  <p>Đang tìm kiếm...</p>
                )}
                {!playing && ready && player.length < 2 && (
                  <p>Đang tìm kiếm...</p>
                )}
              </div>
            )}
          </div>

          <div className="ban-co">
            {matrix.map((item, rowIndex) => (
              <div key={rowIndex} className="list-rows">
                {item.map((col, colIndex) => (
                  <div
                    onClick={() => handleClick(rowIndex, colIndex)}
                    key={colIndex}
                    id={`post-${rowIndex}-${colIndex}`}
                    className="item-o_co"
                  ></div>
                ))}
              </div>
            ))}
            {winner && (
              <div className="winner">
                <h3>{winner} chiến thắng</h3>
              </div>
            )}
          </div>
        </div>
        <div
          className={`info-chess__room ${
            showMobile ? "show-room" : "hidden-show"
          }`}
        >
          <div className="hidden-room-mobile info-chess__action">
            {isViewer ? (
              <button disabled className="btn btn-warning">
                Xem
              </button>
            ) : ready ? (
              <button
                disabled={playing}
                onClick={handleUnReady}
                className="btn btn-success"
              >
                Hủy sẵn sàng
              </button>
            ) : (
              <button className="btn btn-success" onClick={OnClickReady}>
                Sẵn sàng
              </button>
            )}
            <button className="btn btn-warning">Rời phòng</button>
          </div>
          <div className="hidden-room-mobile">
            {!isViewer && (
              <div className="chess-action">
                {playing && gameFinish && <p>Lượt đối thủ ...</p>}
                {playing && gameFinish === false && <p>Lượt của bạn ...</p>}
                {!playing && ready && player.length === 2 && (
                  <p>Đang chờ đối thủ...</p>
                )}
                {!playing && !ready && player.length === 2 && (
                  <p>Đã tìm thấy đối thủ, hãy sãn sàng...</p>
                )}
                {!playing && !ready && player.length < 2 && (
                  <p>Đang tìm kiếm...</p>
                )}
                {!playing && ready && player.length < 2 && (
                  <p>Đang tìm kiếm...</p>
                )}
              </div>
            )}
          </div>
          <div className="info-chess__member hidden-room-mobile">
            {members.length > 0 &&
              members.map((member, key) => {
                return (
                  <Fragment key={key}>
                    {member.player && (
                      <div
                        key={key}
                        className={`member-item ${
                          member.userId === user._id ? "member-me" : ""
                        }`}
                      >
                        <p>Player {key + 1}</p>
                        <p> {member.userName}</p>
                      </div>
                    )}
                  </Fragment>
                )
              })}
          </div>
          <div className="view-action">
            <div
              className={`view-item ${viewChat ? "view-item__active" : ""}`}
              onClick={() => setViewChat(true)}
            >
              Chat
            </div>
            <div
              className={`view-item ${!viewChat ? "view-item__active" : ""}`}
              onClick={() => setViewChat(false)}
            >
              Thành viên
            </div>
          </div>
          {viewChat && (
            <div className="info-chess__chat">
              <div className="info-chat__body">
                {messages.length > 0 &&
                  messages.map((message, key) => {
                    return (
                      <p ref={messRef} className="message" key={key}>
                        <strong>{message?.userName}:</strong>
                        <p>{message.message}</p>
                      </p>
                    )
                  })}
              </div>
              <div className="info-chat__send">
                <input
                  type="text"
                  onKeyDown={handleKeyPress}
                  value={valueChat}
                  onChange={(e) => setValueChat(e.target.value)}
                />
                <div className="btn btn-success" onClick={handleSendMessage}>
                  gửi
                </div>
              </div>
            </div>
          )}
          {!viewChat && (
            <div className="list_members">
              {members.length &&
                members.map((member, key) => {
                  return <p key={key}>{member.userName}</p>
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
