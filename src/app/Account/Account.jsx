import React from "react"
import { useSelector } from "react-redux"
import { DocTitle } from "~/helper/DocTitle"

export const Account = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div className="Account">
      <DocTitle title={`${user.name}`} />
      <header>
        <div className="section">
          <div className="account-avatar">
            <img src={user.avatar} alt="" />
          </div>
          <div className="account-info">
            <div className="account-name">
              <p>{user.name}</p>
              <div className=" btn btn-secondary button">
                Chỉnh sửa trang cá nhân
              </div>
            </div>
            <div className="account-post">
              <p>2 bài viết</p>
              <p>17 người theo dõi</p>
              <p>Đang theo dõi 17 người</p>
            </div>
            <div className="account-desc-short">
              <p>
                Vì anh như cơn gió,anh sợ mình chẳng thể nào mang niềm vui đến
                cho ai...
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="account-body">
        <div className="account-body__heading">
          <div className="account-heading__item">
            <i class="fa-solid fa-table-cells"></i>
            <p>Bài viết</p>
          </div>
          <div className="account-heading__item">
            <i class="fa-solid fa-tablet-screen-button"></i>
            <p>Bảng Feed</p>
          </div>
          <div className="account-heading__item">
            <i class="fa-regular fa-bookmark"></i>
            <p>Đã lưu</p>
          </div>
          <div className="account-heading__item">
            <i class="fa-solid fa-id-card-clip"></i>
            <p>Được gắn thẻ</p>
          </div>
        </div>
      </div>
    </div>
  )
}
