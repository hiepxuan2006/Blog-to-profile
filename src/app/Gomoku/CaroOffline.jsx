import React, { useContext, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { DataContext } from "~/Context/AppContext"
import { toastAlert } from "~/helper/toast"
const xChess = require("../../assets/X-chess.png")
const oChess = require("~/assets/O-chess.png")
export const CaroOffline = () => {
  let [matrix, setMatrix] = useState([])
  let [xFlag, setxFlag] = useState(true)
  let [gameFinish, setGameFinish] = useState(false)
  let { idRoomNumber } = useParams()
  console.log(idRoomNumber)
  let x = 16,
    y = 16
  let checkLine = -1
  const { socket } = useContext(DataContext)
  const { user } = useSelector((state) => state.auth)

  const createBoard = (x, y) => {
    const board = []
    for (let i = 0; i < x; i++) {
      board[i] = Array(y).fill(null)
    }
    return board
  }
  useEffect(() => {
    setMatrix(createBoard(x, y))
  }, [])

  const checkItemClicked = (i, j) => {
    if (matrix[i][j] !== 1 && matrix[i][j] !== 0 && gameFinish === false) {
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
    let player = -1
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        if (matrix[i][j] === 0) {
          if (checkWin(0, i, j) >= 5) {
            fillColorLineWin(checkLine, i, j)
            player = 0
          }
        } else if (matrix[i][j] === 1) {
          if (checkWin(1, i, j) >= 5) {
            fillColorLineWin(checkLine, i, j)
            player = 1
          }
        }
      }
    }
    // showPlayerWin(player);
    if (player !== -1) {
      setGameFinish(true)
      if (player === 1) toastAlert("success", "X chiến thắng")
      if (player === 0) toastAlert("success", "O chiến thắng")
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

    checkLine = -1
    setGameFinish(false)
    setxFlag(true)
  }

  const handleClick = (rowIndex, colIndex) => {
    const newItem = document.getElementById(`post-${rowIndex}-${colIndex}`)

    if (checkItemClicked(rowIndex, colIndex)) {
      if (xFlag) {
        setxFlag(false)
        newItem.style.backgroundImage = `url(${xChess})`
        matrix[rowIndex][colIndex] = 1
      } else {
        setxFlag(true)
        newItem.style.backgroundImage = `url(${oChess})`
        matrix[rowIndex][colIndex] = 0
      }
      findPlayerWin()
    }
  }

  return (
    <div className="Relax-offline">
      <Link className="back" to="/play-game/gomaku-online">
        Trở về
      </Link>
      <div className="ban-co">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="list-rows">
            {row.map((col, colIndex) => (
              <div
                onClick={() => handleClick(rowIndex, colIndex)}
                key={colIndex}
                id={`post-${rowIndex}-${colIndex}`}
                className="item-o_co"
              ></div>
            ))}
          </div>
        ))}
      </div>
      {gameFinish && (
        <div className="restart-game">
          <button className=" btn btn-success" onClick={() => reStartGame()}>
            Chơi lại
          </button>
        </div>
      )}
    </div>
  )
}
