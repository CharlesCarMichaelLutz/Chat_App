import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./AuthProvider"

function PrivateRoute() {
  const { user } = useAuth()

  if (!user || !user.token) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default PrivateRoute
