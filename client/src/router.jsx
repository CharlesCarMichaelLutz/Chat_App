import { createBrowserRouter, Navigate } from "react-router-dom"
import { Layout } from "./layouts/Layout"
import { ErrorPage } from "./pages/ErrorPage"
import { LoginPage } from "./pages/LoginPage"
import { PrivateRoute } from "./components/PrivateRoute"
import { ChatroomPage } from "./pages/ChatroomPage"
import { AuthProvider } from "./components/AuthProvider"

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/login" /> },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "chatroom",
            element: (
              <PrivateRoute>
                <ChatroomPage />
              </PrivateRoute>
            ),
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
