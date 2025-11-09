import React from "react"
import { Outlet } from "react-router-dom"
import { Navigation } from "./Navigation"
import "../styles.css"
import "bootstrap-icons/font/bootstrap-icons.css"

export function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}
