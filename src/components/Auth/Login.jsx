import React from "react"
import { DocTitle } from "../../helper/DocTitle"

export const Login = () => {
  return (
    <div className="card-front">
      <div className="center-wrap">
        <div className="section text-center">
          <h4 className="mb-4 pb-3 ">Log In</h4>
          <div className="form-group">
            <input
              type="email"
              name="logemail"
              className="form-style"
              placeholder=" "
              id="logemail"
              autoComplete="off"
            />
            <label htmlFor="">Your Email</label>
          </div>
          <div className="form-group mt-2">
            <input
              type="password"
              name="logpass"
              className="form-style"
              placeholder=" "
              id="logpass"
              autoComplete="off"
            />
            <label htmlFor="">Your Password</label>
          </div>
          <button href="#" className="btn mt-4">
            submit
          </button>
          <p className="mb-0 mt-4 text-center">
            <a href="#0" className="link">
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
