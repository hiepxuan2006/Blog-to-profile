import React, { useState } from "react"
import { Button, Form, Modal, Spinner } from "react-bootstrap"
import { async } from "react-input-emoji"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { Loading } from "~/components/loading/Loading"
import { toastAlert } from "~/helper/toast"
import { uploadImage } from "~/services/api/createApiServices"
import { createNewChat } from "~/services/api/messageService"
const mayanh = require("~/assets/ma.png")

export const ModalCreateGroup = ({
  show,
  setShow,
  setMemberGroup,
  memberGroup = [],
  accounts = [],
}) => {
  const [image, setImage] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const handleChangeAvatar = (e) => {
    const file = e.target.files[0]
    setImage(file)
    const reader = new FileReader()
    reader.onload = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleClose = () => {
    setMemberGroup([])
    setShow(false)
  }
  const handleChangeAccount = (e, acc) => {
    if (e.target.checked) {
      if (!memberGroup.length) setMemberGroup([acc])
      else {
        const isExits = memberGroup.some((member) => member._id === acc._id)
        !isExits
          ? setMemberGroup([...memberGroup, acc])
          : setMemberGroup([...memberGroup])
      }
    } else {
      handleCloseAcc(acc)
    }
  }
  const handleCloseAcc = (acc) => {
    const members = memberGroup.filter((item) => item._id !== acc._id)
    setMemberGroup(members)
  }
  const handleCreateGroup = async () => {
    if (!name) {
      toastAlert("warn", "Vui lòng nhập tên nhóm !")
      return
    }
    const memberGroupId = memberGroup.map((member) => member._id)
    const members = [...memberGroupId, user._id]
    setLoading(true)
    let dataGroup
    if (image) {
      const formData = new FormData()
      formData.append("image", image)
      formData.append("folder", "media")
      const { success: ready, data: url } = await uploadImage(formData)
      if (!ready) {
        setLoading(false)
        toastAlert("error", "Tải ảnh lên bị lỗi! Thử lại!")
        return
      }
      const { secure_url } = url
      dataGroup = { name, image: secure_url, members }
    } else {
      dataGroup = { name, members }
    }

    const { data, success, message } = await createNewChat(dataGroup)
    if (!success) {
      setLoading(false)
      toastAlert("error", message)
      return
    }
    setLoading(false)
    setName("")
    setMemberGroup([])
    toastAlert("success", "Tạo thành công")

    navigate(`/message/direct/${data._id}`)
  }
  return (
    <Modal className={"modal-add-group"} show={show} onHide={handleClose}>
      {loading && <Loading />}
      <Modal.Header closeButton>
        <Modal.Title>Tạo nhóm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="body-modal d-flex align-items-center">
            <div className="image-group">
              <input
                type="file"
                hidden
                onChange={handleChangeAvatar}
                id="image-room"
              />
              <label htmlFor="image-room">
                <i class="fa-solid fa-plus"></i>
              </label>
              <img src={imagePreview || mayanh} alt="" />
            </div>
            <div className="input-name__group">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="Nhập tên nhóm"
              />
            </div>
          </div>
          <div className="body-members mt-3">
            <p>Thêm bạn vào nhóm</p>
            <input type="text" placeholder="Nhập tên , email để tìm kiếm ..." />
          </div>
          <div className="row mt-3">
            <div className={`col ${memberGroup.length ? "col-6" : "col-12"}`}>
              <p>Trò chuyện gần đây</p>
              <div className="list-account">
                {accounts.length > 0 &&
                  accounts.map((account, key) => {
                    return (
                      <div className="account-item">
                        <div className="account-item__check">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            onChange={(e) => handleChangeAccount(e, account)}
                          />
                        </div>
                        <div className="acount-item__image">
                          <img src={account.avatar} alt="" />
                        </div>
                        <div className="account-item__name">
                          <p>
                            <strong>{account.name}</strong>
                          </p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className={`col col-6 ${memberGroup.length ? "" : "d-none"}`}>
              <div className="list-account list-account-chose">
                <p>Đã chọn: {memberGroup.length}/20</p>
                {memberGroup.length > 0 &&
                  memberGroup.map((account, key) => {
                    return (
                      <div className="account-item">
                        <div className="acount-item__image">
                          <img src={account.avatar} alt="" />
                        </div>
                        <div className="account-item__name">
                          <p>
                            <strong>{account.name}</strong>
                          </p>
                        </div>
                        <div
                          className="account-item__close"
                          onClick={() => handleCloseAcc(account)}
                        >
                          <i class="fa-regular fa-circle-xmark"></i>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={memberGroup.length < 2}
          variant="primary"
          onClick={handleCreateGroup}
        >
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            " Tạo nhóm"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
