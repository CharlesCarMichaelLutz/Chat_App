import React from "react"
import { Outlet } from "react-router-dom"

export function Layout() {
  return (
    <>
      <nav className="top-nav">
        <div className="nav-text-large">Rabbit Chat</div>
        <button>light/dark</button>
      </nav>
      <Outlet />
    </>
  )
}

export default Layout
