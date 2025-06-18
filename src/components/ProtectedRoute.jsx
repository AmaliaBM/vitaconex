import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import SpinnerButton from "../components/SpinnerButton/SpinnerButton"; // Asegúrate de que la ruta sea correcta

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, user, isValidatingToken } = useContext(AuthContext);

  // Mientras se valida el token, muestra el spinner
  if (isValidatingToken) return <SpinnerButton />;

  // Si no está logueado, redirige a login
  if (!isLoggedIn) return <Navigate to="/login" />;

  // Si el usuario no tiene el rol permitido, redirige.
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;

  // Si todo ok, renderiza el componente protegido
  return <Outlet />;
};

export default ProtectedRoute;

