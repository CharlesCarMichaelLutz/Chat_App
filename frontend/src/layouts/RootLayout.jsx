import { Outlet, useLocation } from "react-router-dom";

export function RootLayout() {
  const location = useLocation();
  //const { handleLogout } = useChat()
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-left">
          <h1>Rabbit Chat</h1>
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
              //onClick={handleLogout}
              data-aria-label="logout"
            >
              <span className="bi bi-box-arrow-right"></span>
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
