import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import SpinnerButton from "../components/SpinnerButton/SpinnerButton";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, user, isValidatingToken } = useContext(AuthContext);

  if (isValidatingToken) return <SpinnerButton />;

  if (!isLoggedIn) return <Navigate to="/login" />;

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;


