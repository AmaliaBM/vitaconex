import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // objeto completo: id, role, name, etc.
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [authError, setAuthError] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const authenticateUser = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      setIsValidatingToken(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.payload); // esto incluye id, role, etc.
      setIsLoggedIn(true);
      setAuthError(null);
    } catch (err) {
      console.error("Error verificando token:", err);
      setUser(null);
      setIsLoggedIn(false);
      if (err.response?.data?.msg) {
        setAuthError(err.response.data.msg);
      } else {
        setAuthError("Token inválido o expirado");
      }
    } finally {
      setIsValidatingToken(false);
    }
  };

  const logOutUser = () => {
    removeToken();
    setUser(null);
   setIsLoggedIn(false);
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const contextValue = {
    isLoggedIn,
    user,
    authError,
    authenticateUser,
    storeToken,
    logOutUser,
  };

  if (isValidatingToken) {
    return <h3>...validando sesión</h3>; // Puedes poner un spinner o loader aquí
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
