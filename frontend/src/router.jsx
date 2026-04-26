import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Error } from "./pages/Error";
import { Login } from "./pages/Login";
import { RequireAuth } from "./components/RequireAuth";
import { Chatroom } from "./pages/Chatroom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="/login" /> },
          {
            path: "login",
            Component: Login,
          },
          {
            path: "chatroom",
            element: (
              <RequireAuth>
                <Chatroom />
              </RequireAuth>
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
]);
