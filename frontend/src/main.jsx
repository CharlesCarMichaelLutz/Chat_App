import { createRoot } from "react-dom/client";
import { ChatProvider } from "./context/ChatProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

createRoot(document.getElementById("root")).render(
  <ChatProvider>
    <RouterProvider router={router} />,
  </ChatProvider>,
);
