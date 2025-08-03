import React from "react"
import { useLocation } from "react-router-dom"
import { useAuth } from "../components/AuthProvider"

export function Navigation() {
  const location = useLocation()
  const { handleLogout } = useAuth()

  return (
    <>
      <div className="navbar-container">
        <div>
          <h1 className="navbar-left">Rabbit Chat</h1>
        </div>
        <div className="navbar-right">
          <button>light/dark</button>
          {location.pathname === "/chatroom" && (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  )
}
