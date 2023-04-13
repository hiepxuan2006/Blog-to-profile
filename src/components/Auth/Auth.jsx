import { useContext, useState } from "react"
import { DataContext } from "../../Context/AppContext"
import { DocTitle } from "../../helper/DocTitle"
import { Login } from "./Login"
import { Register } from "./Register"
const img = require("~/assets/bg.png")
export const Auth = () => {
  const { theme, loading } = useContext(DataContext)
  const [btnSwitch, setBtnSwitch] = useState(false)

  const onChangeSwitch = (e) => {
    setBtnSwitch(e.target.checked)
  }
  return (
    <div className={`AuthHomePage  ${theme}`}>
      <DocTitle title={"Đăng nhập hệ thống"} />

      <div className="section">
        <div className="inner">
          <div className=" full-height justify-content-center">
            <div className="wrap-container text-center ">
              <div className="wrap">
                <div className="Image">{/* <img src={img} alt="" /> */}</div>
              </div>
              <div className="wrap  pt-3 pt-sm-2 text-center">
                <input
                  hidden
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                  onChange={onChangeSwitch}
                />

                <label htmlFor="reg-log" />
                <h6 className="mb-0 pb-3 title-type">
                  <label htmlFor="reg-log" className="login">
                    Đăng nhập
                  </label>
                  <label htmlFor="reg-log" className="register">
                    Đăng ký
                  </label>
                </h6>
                <div className="card-3d-wrap ">
                  <div className="card-3d-wrapper">
                    <Login btnSwitch={btnSwitch} />
                    <Register
                      btnSwitch={btnSwitch}
                      setBtnSwitch={setBtnSwitch}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
