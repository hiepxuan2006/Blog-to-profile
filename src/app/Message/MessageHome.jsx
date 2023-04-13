import React from "react"
import { Message } from "./Message"
import { useSelector } from "react-redux"
const robot = require("~/assets/robot.gif")
export const MessageHome = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div className="MessageHome">
      <Message>
        <div className="d-flex h-100 flex-direction-column align-items-center justify-content-center">
          <div className="Content">
            <div className="image-robot">
              <img src={robot} alt="" />
            </div>
            {/* <div className="icon">
              <i className="fa-regular fa-paper-plane"></i>
            </div> */}
            <p className="fs-2">
              Welcome &nbsp;
              <span className="text-success fs-1">{user.name}</span>
            </p>
            <button className="bg-primary">Gửi tin nhắn</button>
          </div>
        </div>
      </Message>
    </div>
  )
}
