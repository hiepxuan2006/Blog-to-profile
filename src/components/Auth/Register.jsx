import React from "react"
import { DocTitle } from "../../helper/DocTitle"

export const Register = () => {
  return (
    <div className="card-back">
      <div className="center-wrap">
        <div className="section text-center">
          <h4 className="mb-4 pb-3">Sign Up</h4>
          <div className="form-group">
            <input
              type="text"
              name="logname"
              className="form-style"
              placeholder="Your Full Name"
              id="logname"
              autoComplete="off"
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="email"
              name="logemail"
              className="form-style"
              placeholder="Your Email"
              id="logemail"
              autoComplete="off"
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="password"
              name="logpass"
              className="form-style"
              placeholder="Your Password"
              id="logpass"
              autoComplete="off"
            />
          </div>
          <button href="#" className="btn mt-4">
            submit
          </button>
        </div>
      </div>
    </div>
  )
}
