import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./AuthProvider"

function PrivateRoute() {
  const { curr } = useAuth()

  if (!curr || !curr.token) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default PrivateRoute
