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
          {/* <button>light/dark</button>
          {location.pathname === "/chatroom" && (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )} */}
          {/* replace with fontawesome button and make accessible */}
          <button>
            <span
              className="bi bi-brightness-high-fill"
              data-aria-label="light/dark mode toggle"
            ></span>
          </button>
          {location.pathname === "/chatroom" && (
            /* replace with fontawesome button and make accessible */
            <button
              className="logout-button"
              onClick={handleLogout}
              data-aria-label="logout"
            >
              <span className="bi bi-box-arrow-right"></span>
              {/* <span class="sr-only">Logout</span> */}
            </button>
          )}
        </div>
      </div>
    </>
  )
}
