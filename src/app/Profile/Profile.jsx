import React, { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router"
import { Link } from "react-scroll"
const avatar = require("~/assets/images/avatar/hx.jpg")
export const Profile = () => {
  const [hideOn, setHideOn] = useState(false)
  const [popUp, setPopUp] = useState(0)
  const handleClick = () => {
    setHideOn(!hideOn)
  }

  const handleMobile = (e) => {
    setHideOn(!hideOn)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setPopUp(1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (popUp) {
      const timeout = setTimeout(() => {
        setPopUp(2)
      }, 4000)
      return () => clearTimeout(timeout)
    }
  }, [popUp])
  return (
    <>
      <div className="Profile">
        {popUp === 1 && (
          <div className={`HelloToast`}>
            <div>
              <p>Have a good day , veryone !</p>
              <p>i'm hiepxuan2006</p>
            </div>
          </div>
        )}
        {popUp === 2 && (
          <div className={`hidden_popup`}>
            <div>
              <p>Have a good day , veryone !</p>
              <p>i'm hiepxuan2006</p>
            </div>
          </div>
        )}
        <nav className="profile_left">
          <h1 className="ms-3 hidden_mobile">Cao Xuân Hiệp</h1>
          <div className="hidden_mobile" onClick={handleMobile}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="avatar">
            <img src={avatar} alt="" />
          </div>
          <div className={`info  ${hideOn ? "hideOn" : "hidden"}`}>
            <ul className="info_list">
              <li onClick={handleClick}>
                <Link
                  onClick={handleClick}
                  activeClass="active"
                  to="about"
                  spy={true}
                  smooth={true}
                  duration={0}
                  offset={-0}
                >
                  about
                </Link>
              </li>
              <li onClick={handleClick}>
                <Link
                  onClick={handleClick}
                  activeClass="active"
                  to="experience"
                  spy={true}
                  smooth={true}
                  duration={0}
                  offset={-0}
                >
                  Experience
                </Link>
              </li>
              <li onClick={handleClick}>
                <Link
                  onClick={handleClick}
                  activeClass="active"
                  to="education"
                  spy={true}
                  smooth={true}
                  duration={0}
                  offset={-0}
                >
                  Education
                </Link>
              </li>
              <li onClick={handleClick}>
                <Link
                  onClick={handleClick}
                  activeClass="active"
                  to="skills"
                  spy={true}
                  smooth={true}
                  duration={0}
                  offset={-0}
                >
                  Skills
                </Link>
              </li>
              <li onClick={handleClick}>
                <Link
                  onClick={handleClick}
                  activeClass="active"
                  to="projects"
                  spy={true}
                  smooth={true}
                  duration={0}
                  offset={-0}
                >
                  Projects
                </Link>
              </li>
              <li onClick={handleClick}>
                <a href="#interests">INTERESTS</a>
              </li>
              <li onClick={handleClick}>
                <Link
                  onClick={handleClick}
                  activeClass="active"
                  to="end"
                  spy={true}
                  smooth={true}
                  duration={0}
                  offset={-0}
                >
                  The End
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="profile_content">
          <section className="section" id="about">
            <div className="my_auto">
              <h1>
                Cao Xuân <span className="text-primary">Hiệp</span>
              </h1>
              <div className="sub_heading ">
                <i className="fa fa-address-card"></i>
                <p>Web developer</p>
              </div>
              <div className="sub_heading mb-4">
                <i className="fa fa-map"></i>
                <p>
                  Diễn lộc,diễn châu,nghệ an -
                  <span className="text-primary"> hiepxuan2006@gmail.com</span>
                </p>
              </div>
              <p className="lead">Welcome to visit my CV online!</p>
              <p className="lead mb-4">
                <em className="sub_welcome">
                  "A little bit of fragrance always clings to the hands that
                  gives flowers!"
                </em>
              </p>
              <p className="lead">
                <strong>
                  <i className="fa-brands fa-node-js"></i> - Backend:
                </strong>
                I am experienced in <strong>Javascript, MongoDB...etc</strong>
                on platform <strong> Node.Js</strong>
              </p>
              <p className="lead">
                <strong>
                  <i className="fa-brands fa-react"></i> - Front-End:
                </strong>
                I am experienced in <strong>Javascript</strong> on{" "}
                <strong>ReactJS</strong> Framework, using <strong>Redux</strong>
                , <strong>Axios</strong>, <strong>Bootstrap</strong>...etc
              </p>
              <p className="lead ">
                <strong>
                  <i className="fa-brands fa-github"></i> - Github :
                </strong>
                <a
                  href="https://github.com/hiepxuan2006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fst-italic"
                >
                  https://github.com/hiepxuan2006
                </a>
              </p>
            </div>
          </section>
          <section className="section" id="experience">
            <div className="my_auto">
              <h1 className="mb-4">Experience</h1>
              <div className="resume-item mb-3">
                <div className="resume_content">
                  <h3>
                    <i className="fa-solid fa-building"></i> FOOBLA TECHNOLOGY
                    COMPANY LIMITED(FOOBLA CO., LTD)
                  </h3>
                  <div className="sub_heading">CTV WEB DEVELOPER FULLSTACK</div>
                  <div className="mt-3 mission">
                    <p>
                      <i className="fa-solid fa-bookmark"></i>
                      <span>
                        Participate in the frontend development of the
                        backoffice merchize system using React.Js
                      </span>
                    </p>
                    <p>
                      <i className="fa-solid fa-bookmark"></i>
                      <span>
                        Develop and maintain backend system backoffice merchize
                        using Node.Js
                      </span>
                    </p>
                  </div>
                </div>
                <div className="resume_time">
                  <p>August 2022 - December 2022</p>
                </div>
              </div>
              <div className="resume-item">
                <div className="resume_content">
                  <h3>
                    <i className="fa-solid fa-building"></i> CHANNEL 28
                    ENTERTAINMENT JOINT STOCK COMPANY
                  </h3>
                  <div className="sub_heading"> WEB FRONT_END DEVELOPER </div>
                  <div className="mt-3 mission">
                    <p>
                      <i className="fa-solid fa-bookmark"></i>
                      <span>
                        Participate in building the front-end of the admin
                        website using React.Js
                      </span>
                    </p>
                  </div>
                </div>
                <div className="resume_time">
                  <p>March 2022 - June 2022</p>
                </div>
              </div>
            </div>
          </section>
          <section className="section" id="education">
            <div className="my_auto">
              <h1 className="mb-4">Education</h1>
              <h3>
                <i className="fa-solid fa-school me-3"></i>
                <a
                  href="https://actvn.edu.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ACADEMY OF CRYPTOGRAPHY TECHNIQUES
                </a>
              </h3>
              <div className="sub_heading">
                I majored in information security, majoring in network security
              </div>
            </div>
          </section>
          <section className="section mb-4" id="skills">
            <div className="my_auto">
              <h1 className="mb-4">Skills</h1>
              <div className="sub_heading">PROGRAMMING LANGUAGES & TOOLS</div>
              <div className="skill mb-5">
                <i className="fa-brands fa-js"></i>
                <i className="fa-brands fa-node-js"></i>
                <i className="fa-brands fa-react"></i>
                <i className="devicon-mongodb-plain"></i>
                <i className="devicon-photoshop-plain"></i>
                <i className="fa-brands fa-github"></i>
                <i className="fa-brands fa-bootstrap"></i>
                <i className="fa-brands fa-docker"></i>
              </div>
              <div className="lead">
                <em>
                  ! If you do not have an awesome brain, you have to ceaselessly
                  learn!
                </em>
              </div>
            </div>
          </section>
          <section className="section mb-4" id="projects">
            <div className="my_auto">
              <h1>Projects</h1>
              <div className="sub_heading mb-4">My projects</div>
              <div>
                <p className="lead">
                  <i className="fa-solid fa-trophy me-3"></i>
                  <span>
                    Developer some frontend functionality using reactjs and api
                    using nodejs
                    <a
                      href="https://seller.merchize.com/login"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong> Merchize backoffice</strong>
                    </a>
                  </span>
                </p>

                <p className="lead">
                  <i className="fa-solid fa-trophy me-3"></i>
                  <span>
                    Building
                    <a
                      href="https://hx-cellphone.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong> Chat app real-time + game caro online</strong>
                    </a>
                    (Project-Based Learning)
                  </span>
                  <p className="ms-5 d-flex flex-column">
                    <a
                      className="text-success"
                      style={{ fontSize: "16px " }}
                      href="https://github.com/hiepxuan2006/Blog-to-profile"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Frontend: https://github.com/hiepxuan2006/Blog-to-profile
                    </a>
                    <a
                      className="text-success"
                      style={{ fontSize: "16px " }}
                      href="https://github.com/hiepxuan2006/Api-chat-Server"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Api: https://github.com/hiepxuan2006/Api-chat-Server
                    </a>
                  </p>
                </p>

                <p className="lead">
                  <i className="fa-solid fa-trophy me-3"></i>
                  <span>
                    Building
                    <a
                      href="https://hx-cellphone.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong> Ecommerce website</strong>
                    </a>
                    (Project-Based Learning)
                  </span>
                  <p className="ms-5 d-flex flex-column">
                    <a
                      className="text-success"
                      style={{ fontSize: "16px " }}
                      href="https://github.com/hiepxuan2006/hx-cellphone"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Api: https://github.com/hiepxuan2006/hx-cellphone
                    </a>
                    <a
                      className="text-success"
                      style={{ fontSize: "16px " }}
                      href="https://github.com/hiepxuan2006/appshop"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Frontend: https://github.com/hiepxuan2006/appshop
                    </a>
                  </p>
                </p>
                <p className="lead">
                  <i className="fa-solid fa-trophy me-3"></i>
                  <span>
                    Building
                    <a
                      href="https://hxdt.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong> foods website</strong>
                    </a>
                    " and "
                    <a
                      href="https://admin-hxdt.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>admin</strong>
                    </a>
                    (Project-Based Learning)
                  </span>
                  <p className="ms-5 d-flex flex-column">
                    <a
                      className="text-success"
                      style={{ fontSize: "16px " }}
                      href="https://github.com/hiepxuan2006/app-form"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Api: https://github.com/hiepxuan2006/app-form
                    </a>
                    <a
                      className="text-success"
                      style={{ fontSize: "16px " }}
                      href="https://github.com/hiepxuan2006/app_server"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Frontend: https://github.com/hiepxuan2006/app_server
                    </a>
                  </p>
                </p>
                <p className="lead">
                  <i className="fa-solid fa-trophy me-3"></i>
                  <span>
                    Building
                    <a
                      href="https://hiepxuan06.github.io/place-travel/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>flags temple</strong>
                    </a>
                    (Project-Based Learning)
                  </span>
                  <p className="ms-5 d-flex flex-column">
                    <a
                      className="text-success"
                      style={{ fontSize: "16px " }}
                      href="https://github.com/hiepxuan2006/flag__reactjs"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source code: https://github.com/hiepxuan2006/flag__reactjs
                    </a>
                  </p>
                </p>
                <p className="lead">
                  <i className="fa-solid fa-trophy me-3"></i>
                  <span>
                    Building
                    <a
                      href="https://hiepxuan.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong> temple overview movie</strong>
                    </a>
                    (Project-Based Learning)
                  </span>
                  <p className="ms-5 d-flex flex-column">
                    <a
                      className="text-success"
                      style={{ fontSize: "16px " }}
                      href="https://github.com/hiepxuan2006/overview__movies"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source code:
                      https://github.com/hiepxuan2006/overview__movies
                    </a>
                  </p>
                </p>
              </div>
            </div>
          </section>
          <section className="section" id="end">
            <div className="my_auto">
              <div className="bg_end">The End</div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
