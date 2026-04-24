//import { useState, useEffect } from "react";
import { useState, useLayoutEffect } from "react";

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

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useLayoutEffect(() => {
    document.documentElement.className = darkMode;
  }, [darkMode]);

  const toggleTheme = () => {
    const newTheme = darkMode === "light" ? "dark" : "light";
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
    setDarkMode(newTheme);
  };

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
