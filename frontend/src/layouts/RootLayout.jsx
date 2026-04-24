import { useState, useEffect } from "react";
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
  const { handleLogout } = useChat();

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-left">
          <h1>Rabbit Chat</h1>
        </div>
        <div className="navbar-right">
          <button onClick={toggleTheme} aria-lablel="switch to a dark theme">
            {darkMode ? (
              <FontAwesomeIcon icon={faLightbulb} />
            ) : (
              <FontAwesomeIcon icon={faMoon} />
            )}
          </button>
          {location.pathname === "/chatroom" && (
            <button onClick={handleLogout} aria-label="logout of application">
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
