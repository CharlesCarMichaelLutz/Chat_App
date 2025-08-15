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
          <button>
            <span
              className="bi bi-brightness-high-fill"
              data-aria-label="light/dark mode toggle"
            ></span>
          </button>
          {location.pathname === "/chatroom" && (
            <button
              className="logout-button"
              onClick={handleLogout}
              data-aria-label="logout"
            >
              <span className="bi bi-box-arrow-right"></span>
            </button>
          )}
        </div>
      </div>
    </>
  )
}
