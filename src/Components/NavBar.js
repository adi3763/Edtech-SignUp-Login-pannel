"use client"

import { Link } from "react-router-dom"
import Logo from "../assets/Logo.svg"
import toast from "react-hot-toast"
import "./NavBar.css"

function NavBar(props) {
  const isLoggedIn = props.isLoggedIn
  const setIsLoggedIn = props.setIsLoggedIn

  return (
    <div className="nav-bar-class">
      <div className="nav-left">
        <Link to={"/"}>
          <img src={Logo || "/placeholder.svg"} alt="logo.png" />
        </Link>
      </div>

      <div className="mid-nav">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/"}>About</Link>
          </li>
          <li>
            <Link to={"/"}>Contact</Link>
          </li>
        </ul>
      </div>

      <div className="right-nav">
        {!isLoggedIn && (
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to={"/signup"}>
            <button>Signup</button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to={"/"}>
            <button
              className="logout-btn"
              onClick={() => {
                setIsLoggedIn(false)
                toast.success("Logout Successful")
              }}
            >
              Logout
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to={"/dashboard"}>
            <button className="dashboard-btn">Dashboard</button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default NavBar
