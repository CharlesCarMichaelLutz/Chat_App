import { createBrowserRouter, Navigate } from "react-router-dom";
import { ChatProvider } from "./components/ChatProvider";
import { RootLayout } from "./layouts/RootLayout";
import { Error } from "./pages/Error";
import { Login } from "./pages/Login";
// import { ProtectedRoute } from "./components/ProtectedRoute"
import { Chatroom } from "./pages/Chatroom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ChatProvider>
        <RootLayout />
      </ChatProvider>
    ),
    children: [
      {
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="/login" /> },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "chatroom",
            // element: <ProtectedRoute />,
            children: [
              {
                path: "",
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
]);
