import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { LogOut, reset } from "./../features/authSlice"
import { IoPerson } from "react-icons/io5"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const Logout = async () => {
    await dispatch(LogOut())
    await dispatch(reset())
    navigate("/")
  }
  // console.log(user)

  const Profile = () => {
    navigate(`/users/edit/${user.userID}`)
  }

  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item">
            {/* Your logo or brand */}
          </NavLink>

          <a
            href="#!"
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button className="button" onClick={Profile}>
                  <IoPerson />
                  Profile
                </button>

                <button className="button is-light" onClick={Logout}>
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
