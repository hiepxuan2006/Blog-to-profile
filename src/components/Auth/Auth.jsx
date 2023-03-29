import React, { useContext } from "react"
import { DataContext } from "../../Context/AppContext"
import { Login } from "./Login"
import { Register } from "./Register"
import { DocTitle } from "../../helper/DocTitle"

export const Auth = () => {
  const { theme } = useContext(DataContext)
  return (
    <div className={`AuthHomePage ${theme}`}>
      <DocTitle title={"Đăng nhập hệ thống"} />
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3 title-type">
                  <span className="login">Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  hidden
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log" />
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <Login />
                    <Register />
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
