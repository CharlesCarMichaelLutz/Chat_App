import { useChat } from "../hooks/useChat";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
  const auth = useChat();
  const location = useLocation();

  //return auth?.accessToken ? (
  // return auth?.["accessToken"] ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/" state={{ from: location }} replace />
  // );

  if (!auth.accessToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
  //return children;
};
