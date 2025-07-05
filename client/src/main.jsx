// import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    <RouterProvider router={router} />
  </>
  // </StrictMode>
)
