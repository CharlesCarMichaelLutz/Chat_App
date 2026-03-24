import { createRoot } from "react-dom/client";
import { ChatProvider } from "./context/ChatProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <ChatProvider>
    <RouterProvider router={router} />,
  </ChatProvider>,
);
