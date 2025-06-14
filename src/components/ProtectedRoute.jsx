
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, user } = useContext(AuthContext);

  if (!isLoggedIn) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return <Outlet />;
};

export default ProtectedRoute;
