/* eslint-disable no-unused-vars */
import { FastField, Form, Formik } from "formik"
import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router"
import * as Yup from "yup"
import { DataContext } from "~/Context/AppContext"
import { LoadingProcess } from "~/helper/LoadingProcess"
import { loginActions } from "../../slices/authSlice"
import { InputField } from "../form/InputField"
import { Loading } from "../loading/Loading"
import { Spinner } from "reactstrap"
export const Login = ({ btnSwitch = false }) => {
  const dispatch = useDispatch()
  const { setIsLogin, isLogin } = useContext(DataContext)
  const [loading, setLoading] = useState(false)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const formikRef = useRef(null)
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  // useEffect(() => {
  //   setInitialValues({
  //     email: "",
  //     password: "",
  //   })
  //   formikRef.current.resetForm()
  // }, [btnSwitch])
  const validation = Yup.object().shape({
    email: Yup.string()
      .email("Vui lòng nhập đúng định dạng email!")
      .required("Vui lòng nhập email!"),
    password: Yup.string()
      .min(6, "Ít nhất 6 ký tự!")
      .matches(/^(?=.*[a-z])/, "Ít nhất 1 ký tự viết thường!")
      .matches(/^(?=.*[A-Z])/, "Ít nhất 1 Ký tự viết hoa!")
      .matches(/^(?=.*[0-9])/, "Ít nhất 1 chữ số!")
      .matches(/^(?=.*[!@#\$%\^&\*])/, "Ít nhất 1 Ký tự đặc biệt!")
      .required("Vui lòng nhập password!"),
  })

  const handleLogin = async (value = {}, resetForm) => {
    const { email, password } = value
    setLoading(true)
    const payload = await dispatch(loginActions({ email, password }))
    setLoading(false)
  }
  if (isLoggedIn) {
    return <Navigate to="/message" />
  }
  return (
    <div className="card-front">
      <div className="center-wrap">
        <Formik
          validationSchema={validation}
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            await handleLogin(values, resetForm)
            // resetForm()
          }}
          innerRef={formikRef}
        >
          {(formikProps) => {
            const { values, errors } = formikProps

            return (
              <Form className="section text-center">
                <h4 className="mb-4 pb-3">Đăng nhập</h4>
                <FastField
                  component={InputField}
                  defaultValue="hiepxuan2006@gmail.com"
                  name="email"
                  placeholder=" "
                  label="Nhập email của bạn!"
                  type="text"
                />
                <FastField
                  component={InputField}
                  name="password"
                  placeholder=" "
                  defaultValue="Hiepxuan98@"
                  label="Nhập mật khẩu của bạn!"
                  type="password"
                />
                <button
                  disabled={loading}
                  onSubmit="submit"
                  href="#"
                  className="btn mt-4 text-error"
                >
                  {loading ? (
                    <Spinner
                      className="load text-success"
                      animation="border"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    "Đăng nhập"
                  )}
                </button>
                <p className="mb-0 mt-4 text-center">
                  <a href="#0" className="link">
                    Quên mật khẩu?
                  </a>
                </p>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}
