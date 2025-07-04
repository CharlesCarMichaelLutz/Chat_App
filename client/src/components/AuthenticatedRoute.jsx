import React from "react"
import { Navigate, Outlet } from "react-router-dom"

export function AuthenticatedRoute({ user }) {
  if (!user || !user.token) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
