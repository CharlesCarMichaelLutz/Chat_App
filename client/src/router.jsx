import { createBrowserRouter, Navigate } from "react-router-dom"
import { Layout } from "./layouts/Layout"
import { ErrorPage } from "./pages/ErrorPage"
import { Login } from "./pages/Login"
import { AuthenticatedRoute } from "./components/AuthenticatedRoute"
import { Chatroom } from "./pages/Chatroom"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          // { index: true, element: <Navigate to="/login" /> },
          {
            path: "login",
            element: <Login />,
          },
          {
            element: <AuthenticatedRoute />,
            children: [
              {
                index: true,
                path: "chatroom",
                element: <Chatroom />,
              },
            ],
          },
          {
            path: "*",
            element: <h1> 404 - Page not found</h1>,
          },
        ],
      },
    ],
  },
])
