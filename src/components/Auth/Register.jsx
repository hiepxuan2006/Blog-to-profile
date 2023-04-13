import React, { useEffect, useRef, useState } from "react"
import { DocTitle } from "../../helper/DocTitle"
import { FastField, Form, Formik } from "formik"
import { InputField } from "../form/InputField"
import * as Yup from "yup"
import { register, uploadImage } from "~/services/api/accountService"
import { toastAlert } from "~/helper/toast"
import { useNavigate } from "react-router"
import { LoadingProcess } from "~/helper/LoadingProcess"
const img = require("~/assets/social1.png")
export const Register = ({ btnSwitch = false, setBtnSwitch }) => {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [initialValues, setInitialValues] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  })

  const formikRef = useRef(null)
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

  useEffect(() => {
    setInitialValues({
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
    })
    formikRef.current.resetForm()
  }, [btnSwitch])
  const validation = Yup.object().shape({
    email: Yup.string()
      .email("Vui lòng nhập đúng định dạng email!")
      .required("Vui lòng nhập email!"),
    name: Yup.string().required("Vui lòng nhập tên!"),
    password: Yup.string()
      .min(6, "Ít nhất 6 ký tự!")
      .matches(/^(?=.*[a-z])/, "Ít nhất 1 ký tự viết thường!")
      .matches(/^(?=.*[A-Z])/, "Ít nhất 1 Ký tự viết hoa!")
      .matches(/^(?=.*[0-9])/, "Ít nhất 1 chữ số!")
      .matches(/^(?=.*[!@#\$%\^&\*])/, "Ít nhất 1 Ký tự đặc biệt!")
      .required("Vui lòng nhập password!"),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref("password")],
      "Mật khẩu không trùng khớp!."
    ),
  })
  const handleLogin = async (value, resetForm) => {
    if (!image) {
      toastAlert("warn", "Vui lòng chọn ảnh!")
      return
    }
    const formData = new FormData()
    formData.append("image", image)
    formData.append("folder", "media")
    setLoading(true)
    const { success: ready, data: url } = await uploadImage(formData)
    if (!ready) {
      setLoading(false)
      toastAlert("error", "Tải ảnh lên bị lỗi! Thử lại!")
      return
    }
    const { secure_url } = url
    const { data, success, message } = await register({
      ...value,
      avatar: secure_url,
    })
    setLoading(false)
    if (!success) {
      toastAlert("error", message)
      return
    }

    toastAlert("success", "Đăng ký thành công!")
    resetForm()
    setBtnSwitch(!btnSwitch)
  }
  return (
    <div className="card-back">
      {loading && <LoadingProcess />}
      <div className="center-wrap">
        <Formik
          validationSchema={validation}
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => handleLogin(values, resetForm)}
          innerRef={formikRef}
        >
          {(formickProps) => {
            return (
              <Form className="section text-center">
                <h4 className="pb-3">Đăng ký</h4>
                <div className="avatar mb-3">
                  <img src={imagePreview || img} alt="" />
                  <input
                    type="file"
                    onChange={handleChangeAvatar}
                    hidden
                    id="image-avatar"
                  />
                  <label htmlFor="image-avatar">
                    <i class="fa-solid fa-circle-plus"></i>
                  </label>
                </div>
                <FastField
                  component={InputField}
                  name="name"
                  placeholder=" "
                  label="Tên bạn là gì?"
                  type="text"
                />

                <FastField
                  component={InputField}
                  name="email"
                  placeholder=" "
                  label="Email bạn là gì?"
                  type="text"
                />
                <FastField
                  component={InputField}
                  name="password"
                  placeholder=" "
                  label="Mật khẩu bạn muốn sử dụng?"
                  type="password"
                />
                <FastField
                  component={InputField}
                  name="passwordConfirm"
                  placeholder=" "
                  label="Nhập lại mật khẩu?"
                  type="password"
                />
                <button href="#" className="btn">
                  submit
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}
