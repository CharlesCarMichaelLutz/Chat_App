import React from "react"
import { useRouteError } from "react-router-dom"

export function ErrorPage() {
  const error = useRouteError()
  return (
    <>
      <h1>Error - Something went wrong</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  )
}