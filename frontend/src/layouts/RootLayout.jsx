import { Outlet, useLocation } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import {
  faPowerOff,
  // faMoon,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function RootLayout() {
  const location = useLocation();
  const { handleLogout } = useChat();
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-left">
          <h1>Rabbit Chat</h1>
        </div>
        <div className="navbar-right">
          <button>
            {/* <span
              className="bi bi-brightness-high-fill"
              data-aria-label="light/dark mode toggle"
            ></span> */}
            {/* conditionally render moon/lightbulb icon if in light/dark mode,  */}
            {/* <FontAwesomeIcon icon={faMoon} /> */}
            <FontAwesomeIcon icon={faLightbulb} />
          </button>
          {location.pathname === "/chatroom" && (
            <button onClick={handleLogout}>
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

//  <button onClick={handleLogout} data-aria-label="logout">
//               {" "}
//               logout
//               {/* <span className="bi bi-box-arrow-right"></span> */}
//               {console.log("logged out")}
//             </button>
