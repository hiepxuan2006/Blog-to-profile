import React from "react"
import { Link } from "react-router-dom"
const gomaku = require("~/assets/gomaku.jpg")
export const Game = () => {
  return (
    <div className="Game">
      <h1>Danh sách trò chơi</h1>
      <div className="list-game mt-3">
        <div className="row">
          <div className="col col-2 col-sm-2 col-lg-2">
            <Link to="/play-game/gomaku-online" className="item-game">
              <img src={gomaku} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
