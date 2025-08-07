import React from "react"
//import { useNavigation, Outlet } from "react-router-dom"
import { Outlet } from "react-router-dom"

import { Navigation } from "./Navigation"
import "../styles.css"
import "bootstrap-icons/font/bootstrap-icons.css"

export function Layout() {
  // const { state } = useNavigation
  // const isLoading = state === "loading"
  return (
    <>
      <Navigation />
      {/* implement same logic in chatroom component */}
      {/* {isLoading && <div className="loading-spinner" />}
      <div className={`container ${isLoading ? "loading" : ""}`}>
        <Outlet />
      </div> */}
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}
