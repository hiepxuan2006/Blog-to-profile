/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { DataContext } from "~/Context/AppContext"
const tb0 = require("~/assets/tables/table-0.png")
const tb1 = require("~/assets/tables/table-1.png")
const tb2 = require("~/assets/tables/table-2.png")
export const GomakuHome = () => {
  const [dataRoom, setDataRoom] = useState([])
  const x = 12
  let arrRoom = new Array(x)
  for (let i = 0; i < x; i++) {
    arrRoom[i] = new Array()
  }

  let mang = Array.from({ length: 12 }, function (_, index) {
    return "Phần tử " + (index + 1)
  })
  const { socket } = useContext(DataContext)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    socket.emit("client-join-game", { userId: user._id, idPlayer: socket.id })
  }, [])

  socket.on("clients-update-list-room", (data) => {
    setDataRoom(data.arrRoom)
  })

  console.log("dataRoom", dataRoom)
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0)
    }
    scrollToTop()
  }, [])
  return (
    <div className="HomeRoom">
      <main id="main-list-room" role="main" className="  pt-3 px-4 row my-main">
        <div className="header-room-gomaku d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 col-md-12">
          <h1 className="h2 center-block">Danh sách các bàn</h1>
          <button className="btn btn-secondary">
            <Link to="/play-game/gomaku-ofline ">Chơi offline</Link>
          </button>
        </div>
        <div className="col-sm-12 h-100">
          <div className="row">
            {mang.map((item, key) => {
              return (
                <Link
                  to={`/play-game/gomaku-online/room/${key + 1}`}
                  key={key}
                  id={`my-div-table-id-${key}`}
                  className=" col-lg-3 col-xs-6 col-sm-6 my-tables mt-5"
                >
                  <div className="small-box bg-red">
                    <div className="inner">
                      <p id="id-ban-4-p" className="my-table-name-p">
                        Bàn {key + 1}
                      </p>
                    </div>
                    <div className="ImageTable">
                      {dataRoom.length && dataRoom[key].length === 1 && (
                        <img
                          src={tb1}
                          id="table-3-img"
                          className="table-image"
                        />
                      )}
                      {dataRoom.length && dataRoom[key].length === 2 && (
                        <img
                          src={tb2}
                          id="table-3-img"
                          className="table-image"
                        />
                      )}
                      {dataRoom.length && dataRoom[key].length === 0 && (
                        <img
                          src={tb0}
                          id="table-3-img"
                          className="table-image"
                        />
                      )}

                      {/* <img src={tb0} id="table-3-img" className="table-image" /> */}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
