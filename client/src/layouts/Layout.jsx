import React from "react"
import { useNavigation, Outlet } from "react-router-dom"
import { Navigation } from "./Navigation"

export function Layout() {
  const { state } = useNavigation
  const isLoading = state === "loading"
  return (
    <>
      <Navigation />
      {isLoading && <div className="loading-spinner" />}
      <div className={`container ${isLoading ? "loading" : ""}`}>
        <Outlet />
      </div>
    </>
  )
}