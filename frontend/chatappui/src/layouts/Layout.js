import React from "react"
import { Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../components/AuthProvider"

export function Layout() {
  const location = useLocation()
  const { logOut } = useAuth()
  return (
    <>
      <div className="navbar-container">
        <div>
          <span className="navbar-left">Rabbit Chat</span>
        </div>
        <div className="navbar-right">
          <button>light/dark</button>
          {location.pathname === "/chatroom" && (
            <button className="logout-button" onClick={logOut}>
              Logout
            </button>
          )}
        </div>
      </div>
      <Outlet />
    </>
  )
}
