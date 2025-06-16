import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, user, isValidatingToken  } = useContext(AuthContext);

  // Mientras se carga el estado de autenticación, mostramos un mensaje o nada
  if (isValidatingToken) return <p>Cargando sesión...</p>;
   //TODO: A futuro: ambiar el <p> por un spinner o loader más bonito

  // Si no está logueado, redirige a login
  if (!isLoggedIn) return <Navigate to="/login" />;

  // Si el usuario no tiene el rol permitido, redirige.
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;

  // Si todo ok, renderiza el componente protegido
  return <Outlet />;
};

export default ProtectedRoute;
