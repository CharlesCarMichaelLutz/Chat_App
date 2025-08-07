import { createRoot } from "react-dom/client"
// import "./styles.css"
// import "bootstrap-icons/font/bootstrap-icons.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
)
