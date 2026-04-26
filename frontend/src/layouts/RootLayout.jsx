import { Outlet, useLocation } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import {
  faPowerOff,
  faMoon,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function RootLayout() {
  const location = useLocation();
  const { darkMode, toggleTheme, handleLogout } = useChat();

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-left">
          <h1>Rabbit Chat</h1>
        </div>
        <div className="navbar-right">
          <button
            onClick={toggleTheme}
            className="light-dark-button"
            aria-lablel="switch to a dark theme"
          >
            {darkMode === "light" ? (
              <FontAwesomeIcon icon={faMoon} />
            ) : (
              <FontAwesomeIcon icon={faLightbulb} />
            )}
          </button>
          {location.pathname === "/chatroom" && (
            <button
              onClick={handleLogout}
              className="logout-button"
              aria-label="logout of application"
            >
              <FontAwesomeIcon icon={faPowerOff} />
            </button>
          )}
        </div>
      </div>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
